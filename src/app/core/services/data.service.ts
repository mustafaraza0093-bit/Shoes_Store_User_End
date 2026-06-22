import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Brand } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products: Product[] = [];
  private brands: Brand[] = [];

  constructor() {
    this.initializeProducts();
    this.initializeBrands();
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getBrands(): Observable<Brand[]> {
    return of(this.brands);
  }

  getFlashSaleProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.isFlashSale));
  }

  getFeaturedProducts(): Observable<Product[]> {
    // Return first 8 new arrivals
    return of(this.products.filter(p => p.condition === 'NEW').slice(0, 8));
  }

  private initializeBrands() {
    const brandNames = ['Nike', 'Adidas', 'Converse', 'Vans', 'Reebok', 'New Balance', 'Puma', 'Yeezy', 'Skechers', 'Bata'];
    this.brands = brandNames.map(name => ({
      id: name.toLowerCase().replace(' ', '-'),
      name: name,
      productCount: this.products.filter(p => p.brand === name).length
    }));
  }

  private initializeProducts() {
    const placeholderImg = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop';
    const placeholderImg2 = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop';
    const placeholderImg3 = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop';
    const placeholderImg4 = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop';
    const images = [placeholderImg, placeholderImg2, placeholderImg3, placeholderImg4];

    const dummyReviews = [
      { id: '1', author: 'Ali Khan', rating: 5, date: '12 Jun 2026', text: 'Amazing shoes! Very comfortable and the quality is outstanding. Highly recommend.' },
      { id: '2', author: 'Saad Ahmed', rating: 4, date: '15 Jun 2026', text: 'Good condition as described, fits perfectly. Fast delivery from Sole & Story.' },
      { id: '3', author: 'Hamza Bilal', rating: 5, date: '18 Jun 2026', text: 'Prompt delivery, genuine product. Will definitely order again.' }
    ];

    const conditionReport = {
      grade: 'Good (8/10)',
      inspectedDate: '18 Jun 2026',
      sole: 8, upper: 9, insole: 8, laces: 10, stitching: 9,
      notes: 'Worn approximately 5 times. Stored in original box.',
      originalBox: true
    };

    // ===================== MALE PRODUCTS (13) =====================
    this.products.push({
      id: 'm1', name: "Air Force 1 '07", brand: 'Nike', category: 'Male', condition: 'NEW',
      price: 12500, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews,
      description: "The Nike Air Force 1 '07 is a timeless icon in street footwear. First introduced in 1982, it combines a low-top silhouette with Nike's Air cushioning technology for all-day comfort. The clean white leather upper with a perforated toe box keeps things fresh, while the chunky midsole gives that classic elevated look."
    });
    this.products.push({
      id: 'm2', name: 'Stan Smith', brand: 'Adidas', category: 'Male', condition: 'NEW',
      price: 9800, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      images, reviews: dummyReviews,
      description: 'The Adidas Stan Smith is a tennis legend turned everyday staple. Its clean leather upper, perforated 3-Stripes, and signature green heel tab make it one of the most recognizable sneakers in the world.'
    });
    this.products.push({
      id: 'm3', name: 'Jordan 1 Retro High', brand: 'Nike', category: 'Male', condition: 'NEW',
      price: 21000, originalPrice: 28000, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews, isFlashSale: true,
      description: 'The Air Jordan 1 Retro High OG is where it all started. Originally designed for Michael Jordan in 1985, this high-top silhouette features premium leather, the iconic Wings logo, and the classic Nike Air branding on the tongue.'
    });
    this.products.push({
      id: 'm4', name: 'Old Skool Black', brand: 'Vans', category: 'Male', condition: 'PRE-OWNED',
      price: 4500, sizes: ['UK 8', 'UK 9'], inStockSizes: ['UK 8', 'UK 9'],
      images, reviews: dummyReviews, conditionReport,
      description: "The Vans Old Skool is the brand's first shoe to feature the iconic side stripe. With a durable canvas and suede upper, padded collar, and signature waffle outsole, it's built for both skating and everyday style."
    });
    this.products.push({
      id: 'm5', name: 'Chuck Taylor High', brand: 'Converse', category: 'Male', condition: 'NEW',
      price: 7200, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews,
      description: 'The Converse Chuck Taylor All Star High Top is an enduring cultural icon. Canvas upper, rubber cap toe, medial-side air vent holes, and the unmistakable ankle patch make this the most timeless sneaker in history.'
    });
    this.products.push({
      id: 'm6', name: 'Ultraboost 22', brand: 'Adidas', category: 'Male', condition: 'NEW',
      price: 22500, sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'],
      images, reviews: dummyReviews,
      description: "The Adidas Ultraboost 22 delivers an incredible energy return with every step. Featuring a Primeknit upper, responsive Boost midsole, and Continental rubber outsole, it's the ultimate performance running shoe that doubles as a lifestyle staple."
    });
    this.products.push({
      id: 'm7', name: 'Classic Leather', brand: 'Reebok', category: 'Male', condition: 'NEW',
      price: 8600, sizes: ['UK 7', 'UK 8', 'UK 9'], inStockSizes: ['UK 7', 'UK 8', 'UK 9'],
      images, reviews: dummyReviews,
      description: 'The Reebok Classic Leather is a heritage design with timeless appeal. Soft garment leather upper, removable sockliner, and EVA midsole provide lightweight cushioning for everyday comfort.'
    });
    this.products.push({
      id: 'm8', name: 'Foam Runner', brand: 'Yeezy', category: 'Male', condition: 'PRE-OWNED',
      price: 18375, originalPrice: 24500, sizes: ['UK 9', 'UK 10'], inStockSizes: ['UK 9', 'UK 10'],
      images, reviews: dummyReviews, conditionReport, isFlashSale: true,
      description: 'The Yeezy Foam Runner is a futuristic slip-on clog made from harvested algae and EVA foam. Its organic form, ventilation ports, and ultralight construction make it a standout piece in the Yeezy lineup.'
    });
    this.products.push({
      id: 'm9', name: '574 Core', brand: 'New Balance', category: 'Male', condition: 'NEW',
      price: 14200, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews,
      description: "The New Balance 574 Core is one of the brand's most iconic models. Featuring a suede and mesh upper, ENCAP midsole, and classic 'N' branding, it balances heritage style with modern comfort."
    });
    this.products.push({
      id: 'm10', name: 'Dunk Low', brand: 'Nike', category: 'Male', condition: 'NEW',
      price: 12375, originalPrice: 16500, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews, isFlashSale: true,
      description: 'The Nike Dunk Low originally hit the hardwood in 1985 and has since become a streetwear staple. Padded, low-cut collar, perforated toe, and classic color blocking make it as versatile as it is comfortable.'
    });
    this.products.push({
      id: 'm11', name: 'Suede Classic', brand: 'Puma', category: 'Male', condition: 'NEW',
      price: 7800, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      images, reviews: dummyReviews,
      description: "The Puma Suede Classic is a pop-culture icon that's been rocked by athletes, hip-hop artists, and fashionistas since 1968. Premium suede upper, rubber cupsole, and the signature Formstrip define this legendary silhouette."
    });
    this.products.push({
      id: 'm12', name: 'Slip-On Pro', brand: 'Vans', category: 'Male', condition: 'PRE-OWNED',
      price: 3200, sizes: ['UK 8', 'UK 9'], inStockSizes: ['UK 8', 'UK 9'],
      images, reviews: dummyReviews, conditionReport,
      description: 'The Vans Slip-On Pro is a laceless classic upgraded for skateboarding. It features padded UltraCush HD sockliners, reinforced toe caps, and Duracap reinforcement in high-wear areas.'
    });
    this.products.push({
      id: 'm13', name: 'NMD R1', brand: 'Adidas', category: 'Male', condition: 'NEW',
      price: 13500, originalPrice: 18000, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews, isFlashSale: true,
      description: "The Adidas NMD R1 merges past and future. Inspired by vintage runners, it features a knit upper, full-length Boost midsole, and signature heel plugs. It's a modern icon of nomadic street style."
    });

    // ===================== FEMALE PRODUCTS (10) =====================
    this.products.push({
      id: 'f1', name: 'Platform Chuck Taylor', brand: 'Converse', category: 'Female', condition: 'NEW',
      price: 8500, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: 'The Converse Chuck Taylor Platform adds a bold lift to the timeless silhouette. Canvas upper with a chunky platform sole for an elevated everyday look.'
    });
    this.products.push({
      id: 'f2', name: 'Air Max Dia', brand: 'Nike', category: 'Female', condition: 'NEW',
      price: 14000, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6'],
      images, reviews: dummyReviews,
      description: "The Nike Air Max Dia offers a sleek, modern take on Air Max heritage. Featuring a translucent upper, elongated Air unit, and lightweight foam midsole, it's designed for the fashion-forward."
    });
    this.products.push({
      id: 'f3', name: 'Falcon', brand: 'Adidas', category: 'Female', condition: 'PRE-OWNED',
      price: 6200, sizes: ['UK 4', 'UK 5', 'UK 6'], inStockSizes: ['UK 5', 'UK 6'],
      images, reviews: dummyReviews, conditionReport,
      description: "The Adidas Falcon draws inspiration from '90s running shoes. Featuring a chunky silhouette, mesh and suede upper, and Torsion system for midfoot support, it's a bold retro statement."
    });
    this.products.push({
      id: 'f4', name: 'Classic Leather', brand: 'Reebok', category: 'Female', condition: 'NEW',
      price: 8200, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: 'The Reebok Classic Leather for women features a soft garment leather upper, die-cut EVA midsole, and elegant low-profile design for timeless everyday style.'
    });
    this.products.push({
      id: 'f5', name: 'Old Skool Platform', brand: 'Vans', category: 'Female', condition: 'NEW',
      price: 7500, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6'],
      images, reviews: dummyReviews,
      description: 'The Vans Old Skool Platform puts a feminine twist on the classic with a stacked sole. Canvas and suede construction with the iconic sidestripe.'
    });
    this.products.push({
      id: 'f6', name: 'RS-X Reinvention', brand: 'Puma', category: 'Female', condition: 'PRE-OWNED',
      price: 5800, sizes: ['UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 5', 'UK 6'],
      images, reviews: dummyReviews, conditionReport,
      description: "The Puma RS-X Reinvention reimagines the '80s Running System with extreme mesh and leather overlays, bold color blocking, and a super-cushioned sole unit."
    });
    this.products.push({
      id: 'f7', name: 'Air Max 90', brand: 'Nike', category: 'Female', condition: 'NEW',
      price: 16500, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: "The Nike Air Max 90 for women keeps the classic Tinker Hatfield design alive. Visible Max Air heel unit, waffle outsole, and layered leather and textile upper deliver iconic comfort."
    });
    this.products.push({
      id: 'f8', name: '327', brand: 'New Balance', category: 'Female', condition: 'NEW',
      price: 12800, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: "The New Balance 327 features an oversized 'N' logo, exaggerated wedge outsole, and retro-inspired suede and nylon upper. It's a fresh take on vintage running."
    });
    this.products.push({
      id: 'f9', name: 'Cali Star', brand: 'Puma', category: 'Female', condition: 'PRE-OWNED',
      price: 4900, sizes: ['UK 4', 'UK 5', 'UK 6'], inStockSizes: ['UK 5'],
      images, reviews: dummyReviews, conditionReport,
      description: 'The Puma Cali Star blends California vibes with street style. A perforated leather upper and stacked rubber sole give it a fresh, elevated look.'
    });
    this.products.push({
      id: 'f10', name: 'Superstar', brand: 'Adidas', category: 'Female', condition: 'NEW',
      price: 10500, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: 'The Adidas Superstar is a court classic that crossed over into street culture. Its signature shell toe, leather upper, and serrated 3-Stripes make it instantly recognizable.'
    });

    // ===================== BOYS PRODUCTS (8) =====================
    this.products.push({
      id: 'b1', name: 'Pico 5', brand: 'Nike', category: 'Boys', condition: 'NEW',
      price: 5500, sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 1', 'UK 2', 'UK 3'],
      images, reviews: dummyReviews,
      description: 'The Nike Pico 5 is designed for active kids. Secure hook-and-loop straps, lightweight cushioning, and a durable rubber outsole make it perfect for playground adventures.'
    });
    this.products.push({
      id: 'b2', name: 'Runfalcon 3.0', brand: 'Adidas', category: 'Boys', condition: 'NEW',
      price: 5800, sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 2', 'UK 3', 'UK 4'],
      images, reviews: dummyReviews,
      description: 'The Adidas Runfalcon 3.0 for boys delivers a lightweight, cushioned ride for young runners. Mesh upper for breathability and a durable outsole for all-terrain play.'
    });
    this.products.push({
      id: 'b3', name: 'S Lights Energy', brand: 'Skechers', category: 'Boys', condition: 'NEW',
      price: 6200, sizes: ['UK 1', 'UK 2', 'UK 3'], inStockSizes: ['UK 1', 'UK 2', 'UK 3'],
      images, reviews: dummyReviews,
      description: "The Skechers S Lights Energy features built-in LED lights in the midsole that flash with every step. Mesh upper, memory foam insole, and a flexible sole make it a kids' favorite."
    });
    this.products.push({
      id: 'b4', name: 'Old Skool Youth', brand: 'Vans', category: 'Boys', condition: 'PRE-OWNED',
      price: 3500, sizes: ['UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 2', 'UK 3'],
      images, reviews: dummyReviews, conditionReport,
      description: "The Vans Old Skool Youth scales down the iconic skate shoe for young riders. Durable canvas and suede upper with the signature sidestripe and waffle outsole."
    });
    this.products.push({
      id: 'b5', name: 'Chuck Taylor Youth', brand: 'Converse', category: 'Boys', condition: 'NEW',
      price: 4800, sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'],
      images, reviews: dummyReviews,
      description: 'The Converse Chuck Taylor for youth brings the iconic All Star design to smaller feet. Canvas upper, rubber toe cap, and the classic ankle patch.'
    });
    this.products.push({
      id: 'b6', name: 'Court Rider', brand: 'Puma', category: 'Boys', condition: 'NEW',
      price: 6800, sizes: ['UK 2', 'UK 3', 'UK 4', 'UK 5'], inStockSizes: ['UK 2', 'UK 3', 'UK 4'],
      images, reviews: dummyReviews,
      description: 'The Puma Court Rider for boys is designed for basketball performance. NITRO foam technology, mesh upper for breathability, and rubber outsole for court traction.'
    });
    this.products.push({
      id: 'b7', name: 'Fresh Foam Arishi', brand: 'New Balance', category: 'Boys', condition: 'NEW',
      price: 5200, sizes: ['UK 1', 'UK 2', 'UK 3'], inStockSizes: ['UK 2', 'UK 3'],
      images, reviews: dummyReviews,
      description: "The New Balance Fresh Foam Arishi delivers plush comfort for young athletes. Data-driven Fresh Foam cushioning, engineered mesh upper, and a sleek modern profile."
    });
    this.products.push({
      id: 'b8', name: 'Power School', brand: 'Bata', category: 'Boys', condition: 'PRE-OWNED',
      price: 2800, sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 1', 'UK 2'],
      images, reviews: dummyReviews, conditionReport,
      description: 'The Bata Power School shoe is built for durability and everyday school wear. Synthetic leather upper, cushioned insole, and a hard-wearing rubber outsole.'
    });

    // ===================== KIDS PRODUCTS (8) =====================
    this.products.push({
      id: 'k1', name: 'Revolution 6', brand: 'Nike', category: 'Kids', condition: 'NEW',
      price: 4200, sizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K'],
      images, reviews: dummyReviews,
      description: 'The Nike Revolution 6 for little kids features easy-on straps, lightweight foam cushioning, and a playful design that keeps little feet comfortable and supported.'
    });
    this.products.push({
      id: 'k2', name: 'Tensaur Sport', brand: 'Adidas', category: 'Kids', condition: 'NEW',
      price: 4500, sizes: ['UK 10K', 'UK 11K', 'UK 12K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K'],
      images, reviews: dummyReviews,
      description: 'The Adidas Tensaur Sport for kids is designed for active play. Hook-and-loop closure, cushioned midsole, and non-marking rubber outsole for indoor and outdoor fun.'
    });
    this.products.push({
      id: 'k3', name: 'Bubblegummers Rainbow', brand: 'Bata', category: 'Kids', condition: 'NEW',
      price: 2800, sizes: ['UK 10K', 'UK 11K', 'UK 12K'], inStockSizes: ['UK 11K', 'UK 12K'],
      images, reviews: dummyReviews,
      description: 'The Bata Bubblegummers Rainbow is a colorful and fun shoe for little adventurers. Lightweight synthetic upper, cushioned footbed, and slip-resistant sole for safe play.'
    });
    this.products.push({
      id: 'k4', name: 'S Lights Glimmer', brand: 'Skechers', category: 'Kids', condition: 'NEW',
      price: 5500, sizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'],
      images, reviews: dummyReviews,
      description: 'The Skechers S Lights Glimmer features sparkling LED lights that dazzle with every step. Memory Foam insole, glitter fabric upper, and a bungee lace design for easy on and off.'
    });
    this.products.push({
      id: 'k5', name: 'Star Runner 3', brand: 'Nike', category: 'Kids', condition: 'PRE-OWNED',
      price: 3200, sizes: ['UK 11K', 'UK 12K', 'UK 13K'], inStockSizes: ['UK 11K', 'UK 12K'],
      images, reviews: dummyReviews, conditionReport,
      description: 'The Nike Star Runner 3 is built for kids on the move. Lightweight mesh upper, foam midsole for cushioning, and easy hook-and-loop straps for independent kids.'
    });
    this.products.push({
      id: 'k6', name: 'Fortarun 2.0', brand: 'Adidas', category: 'Kids', condition: 'NEW',
      price: 4800, sizes: ['UK 10K', 'UK 11K', 'UK 12K'], inStockSizes: ['UK 10K', 'UK 11K'],
      images, reviews: dummyReviews,
      description: 'The Adidas FortaRun 2.0 for kids features elastic laces and top strap for easy on-off, a cushioned Cloudfoam midsole, and colorful graphics inspired by adventure.'
    });
    this.products.push({
      id: 'k7', name: 'Bubblegummers Star', brand: 'Bata', category: 'Kids', condition: 'NEW',
      price: 2500, sizes: ['UK 10K', 'UK 11K', 'UK 12K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K'],
      images, reviews: dummyReviews,
      description: 'The Bata Bubblegummers Star is a reliable everyday shoe for toddlers. Soft lining, padded collar, and a non-slip outsole keep little ones safe and comfy.'
    });
    this.products.push({
      id: 'k8', name: 'Stepflex Infant', brand: 'Reebok', category: 'Kids', condition: 'NEW',
      price: 3800, sizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K'],
      images, reviews: dummyReviews,
      description: "The Reebok Stepflex Infant is engineered for little walkers. Flexible outsole supports natural foot movement, while the cushioned insole and hook-and-loop closure make it a parent's dream."
    });

    // ===================== EXTRA VARIETY PRODUCTS (7) =====================
    this.products.push({
      id: 'v1', name: 'Gel-Lyte III', brand: 'New Balance', category: 'Male', condition: 'PRE-OWNED',
      price: 6800, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9'],
      images, reviews: dummyReviews, conditionReport,
      description: 'A vintage runner with split-tongue design for a snug fit. Premium suede and mesh upper with GEL cushioning in the rearfoot for superior shock absorption.'
    });
    this.products.push({
      id: 'v2', name: 'Club C 85', brand: 'Reebok', category: 'Female', condition: 'NEW',
      price: 9200, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6'],
      images, reviews: dummyReviews,
      description: "The Reebok Club C 85 is a court classic reborn. Clean white leather, subtle perforations, and the iconic window logo make it the perfect minimal sneaker."
    });
    this.products.push({
      id: 'v3', name: 'D Lites Fresh Start', brand: 'Skechers', category: 'Female', condition: 'NEW',
      price: 8800, sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
      images, reviews: dummyReviews,
      description: "The Skechers D'Lites Fresh Start is a chunky, retro-inspired sneaker with Air-Cooled Memory Foam insole, lace-up front, and a bold platform midsole for statement style."
    });
    this.products.push({
      id: 'v4', name: 'Ozweego', brand: 'Adidas', category: 'Male', condition: 'NEW',
      price: 15500, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews,
      description: "The Adidas Ozweego channels '90s rave culture with its chunky, sculptured design. AdiPRENE cushioning under the heel, mesh tongue, and TPU overlays create a uniquely bold shoe."
    });
    this.products.push({
      id: 'v5', name: 'SK8-Hi', brand: 'Vans', category: 'Male', condition: 'NEW',
      price: 8200, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      images, reviews: dummyReviews,
      description: 'The Vans SK8-Hi is the legendary high top from 1978. Durable canvas and suede upper, padded ankle support, and the classic waffle rubber outsole for boardfeel and grip.'
    });
    this.products.push({
      id: 'v6', name: 'Caven 2.0', brand: 'Puma', category: 'Boys', condition: 'NEW',
      price: 4500, sizes: ['UK 1', 'UK 2', 'UK 3', 'UK 4'], inStockSizes: ['UK 1', 'UK 2', 'UK 3'],
      images, reviews: dummyReviews,
      description: 'The Puma Caven 2.0 is a retro-inspired court shoe for boys. Synthetic leather upper, SoftFoam+ sockliner, and classic Puma branding give it a clean, sporty look.'
    });
    this.products.push({
      id: 'v7', name: 'Twinkle Toes', brand: 'Skechers', category: 'Kids', condition: 'NEW',
      price: 4200, sizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'], inStockSizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K'],
      images, reviews: dummyReviews,
      description: 'The Skechers Twinkle Toes light up with rhinestone-trimmed sparkle. Memory Foam cushioned comfort insole, stretch laces, and a hook-and-loop strap for easy wear.'
    });
  }
}
