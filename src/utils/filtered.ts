import { MensualityGetType } from '../types/mensuality';

export function filtered(
  mensualities: MensualityGetType[] | undefined,
  searchValue: string,
  selectedCategory: string
) {
  return mensualities?.filter(
    (mensuality) =>
      (selectedCategory === 'all' ||
        mensuality.category.id === selectedCategory) &&
      (mensuality.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          searchValue
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        ) ||
        mensuality.price.toString().includes(searchValue) ||
        mensuality.category.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            searchValue
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ))
  );
}
