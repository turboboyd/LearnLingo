export function useIsFavoriteBtn(favorites) {
  return teacher => {
    return favorites.some(favTeacher => favTeacher.id === teacher.id);
  };
}
