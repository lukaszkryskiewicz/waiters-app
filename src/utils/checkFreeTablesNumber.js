export const freeTablesNumber = (usedTableNumberArr) => {
  const tableNumbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const freeTableNumbersArr = tableNumbersArr.filter(x => !usedTableNumberArr.includes(x))

  return freeTableNumbersArr
}