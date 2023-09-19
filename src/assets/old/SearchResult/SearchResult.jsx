// import { useSelector } from "react-redux/es/hooks/useSelector";

// //import ActivityBlock from "../ActivityBlock/ActivityBlock";
// //import LessonBlock from "../LessonBlock/LessonBlock";

// import { useIncludeFilter } from "../../hooks/useIncludeFilter";

// const SearchResult = () => {
//     const searchRequest = useSelector((state) => state.data.searchQuery.search);
//     console.log(searchRequest);
//     const activitiesList = useSelector((state) => state.data.activitiesList);
//     const lessonsList = useSelector((state) => state.data.lessonsList);

//     const filteredLessons = useIncludeFilter(lessonsList, searchRequest);
//     console.log("lesson", filteredLessons);
//     const filteredActivities = useIncludeFilter(activitiesList, searchRequest);
//     console.log("activités", filteredActivities);

//     return (
//         <div>
//             <div>
//                 <h2>Resultat de la recherche: </h2>
//                 <p>&quot;{searchRequest}&quot;</p>
//             </div>

//             <div></div>
//         </div>
//     );
// };

// export default SearchResult;
