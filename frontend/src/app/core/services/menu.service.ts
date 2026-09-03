import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem, MenuCategory } from '../models/menu-item.model';
import { MOCK_MENU } from '../data';


@Injectable({ providedIn: 'root' })
export class MenuService {
  getMenu(): Observable<MenuItem[]> {
    return of(MOCK_MENU);
  }

  getMenuByCategory(category: MenuCategory): Observable<MenuItem[]> {
    return of(MOCK_MENU.filter(i => i.category === category));
  }

  getFeaturedItems(): Observable<MenuItem[]> {
    return of(MOCK_MENU.filter(i => i.isFeatured));
  }

  searchMenu(query: string): Observable<MenuItem[]> {
    const q = query.toLowerCase();
    return of(MOCK_MENU.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    ));
  }
}
