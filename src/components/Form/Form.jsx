import PropTypes from "prop-types";
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginPost, registerPost, userInfoPatch, passwordPatch, deleteAccount } from '../../store/reducers/userReducer';
import * as Form from '@radix-ui/react-form';
import Input from "../Input/Input";
import styles from './form.module.scss';
import { ButtonMain } from '../Button/Button';

const Forms = ({ name, formName, inputs, values, setShowDeleteForm }) => {

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        values: values
    });

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const { error } = useSelector(state => state.userData);

    const ValidatePassword = () => {
        return {
            required: true,
            validate: () => watch("ConfirmPassword") !== watch("password") ? "Le mot de passe ne correspond pas." : true
        }
    };

    const onSubmit = data => {
        data['ConfirmPassword'] && Reflect.deleteProperty(data, 'ConfirmPassword');
        formName === 'login' && dispatch(loginPost(data));
        formName === 'register' && dispatch(registerPost(data));
        formName === 'usernameInfoPatch' && dispatch(userInfoPatch(data));
        formName === 'passwordPatch' && dispatch(passwordPatch(data));
        formName === 'conditionnalDeleteAccount' && setShowDeleteForm(false);
        formName === 'deleteAccount' && dispatch(deleteAccount(data));
        reset();
    };

    return (
        <Form.Root className={styles.FormRoot} onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(({ name: fieldName, label, type, cond, ...rest }) => (
                <Form.Field className={styles.FormField} key={fieldName}>
                    <Form.Label className={styles.FormLabel}>{label}</Form.Label>
                    <Form.Control asChild>
                        <Input
                            ref={inputRef}
                            register={
                                register(fieldName, fieldName === 'ConfirmPassword' ? ValidatePassword() : cond)
                            }
                            type={type}
                            {...rest}
                        />

                    </Form.Control>

                    {/* Gestion d'erreur front (Hook Form) */}
                    {errors[fieldName] && <p className={styles.FormError}>{errors[fieldName].message}</p>}

                    {/* Gestion d'erreur back (store) */}
                    {error.userInfoPatch !== '' && fieldName === 'usernamePatch' && <p className={styles.FormError}>{error.userInfoPatch}</p>}
                    {error.userInfoPatch !== '' && fieldName === 'emailPatch' && <p className={styles.FormError}>{error.userInfoPatch}</p>}
                    {error.email !== '' && fieldName === 'email' && <p className={styles.FormError}>{error.email}</p>}
                    {error.oldPassword !== '' && fieldName === 'oldPassword' && <p className={styles.FormError}>{error.oldPassword}</p>}
                    {error.passwordDeleteAccount !== '' && fieldName === 'passwordDeleteAccount' && <p className={styles.FormError}>{error.passwordDeleteAccount}</p>}
                </Form.Field>
            ))}

            <Form.Submit asChild>
                <ButtonMain>
                    {name}
                </ButtonMain>
            </Form.Submit>
        </Form.Root>
    )
};

Forms.propTypes = {
    name: PropTypes.string,
    formName: PropTypes.string,
    inputs: PropTypes.array,
    values: PropTypes.object,
    setShowDeleteForm: PropTypes.func,
}

export default Forms;
