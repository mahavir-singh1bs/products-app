import { FavoritesService } from "./favorites/favorites.service";
import { ProductsService } from "./products.service";
import { ProductViewService } from "./product-view/product-view.service";

export function favoritesFactory(isFavorite: boolean) {
  return (productViewService: ProductViewService) => {
    if (isFavorite) {
      return new FavoritesService(productViewService);
    } else {
      return new ProductsService();
    }
  }
}
