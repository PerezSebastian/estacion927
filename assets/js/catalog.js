// Catálogo y carrito de pedido
const WHATSAPP_PHONE = '5493412156308';

// Fallback de CONFIG si config.js no está cargado
if (typeof CONFIG === 'undefined') {
    window.CONFIG = {
        API_URL: '',
        BUSINESS_ID: '',
        API_KEY: '',
        PUBLIC_ONLY: false
    };
}

let catalogProducts = [];

const LOCAL_PRODUCTS_FALLBACK = [
    {
        id: 0,
        title: 'Yerba mate orgánica APIDELTA 500g',
        category: 'Infusiones',
        image: 'assets/img/yerba-apidelta.png',
        sinTacc: true,
        vegano: true,
        description: 'Es una yerba mate de tipo tradicional, presentada en envase de papel. Se destaca por un proceso de estacionamiento natural de 18 meses, lo que garantiza una maduración óptima. En la foto, cuenta con un indicador de ser una variante antiácida.',
        benefits: [
            'Baja en acidez: Gracias a su largo tiempo de estacionamiento, es más suave para el sistema digestivo, ideal para quienes sufren de acidez estomacal al tomar mate.',
            'Sabor estable: El proceso natural evita que el sabor se lave rápidamente.',
            'Acompaña rutinas diarias sin perder el carácter clásico del mate.'
        ]
    },
    {
        id: 1,
        title: 'Aceite de oliva TU ACEITE 250ml',
        category: 'Aceites',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Aceite de oliva de uso cotidiano, ideal para condimentar ensaladas, vegetales grillados y preparaciones simples donde se busca un perfil natural y equilibrado.',
        benefits: [
            'Fuente de grasas monoinsaturadas, aliadas de una alimentación consciente.',
            'Aporta aroma suave sin tapar el sabor de los alimentos.',
            'Formato práctico de 250ml, cómodo para cocina diaria o mesa.'
        ]
    },
    {
        id: 2,
        title: 'Aceite de coco TU ACEITE 250ml',
        category: 'Aceites',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Aceite de coco versátil, pensado para recetas dulces, salteados suaves y preparaciones naturales que buscan una textura cremosa y un aroma delicado.',
        benefits: [
            'Buena estabilidad para preparaciones tibias o de repostería saludable.',
            'Aporta notas aromáticas suaves a budines, granolas y bowls.',
            'También puede usarse en rutinas de cuidado natural externo.'
        ]
    },
    {
        id: 3,
        title: 'Cereal sin azúcar COPITOS 350g',
        category: 'Cereales',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: false,
        vegano: true,
        description: 'Cereal crocante sin azúcar agregada, pensado para desayunos livianos, yogures, bowls con fruta o meriendas rápidas sin exceso de dulzor.',
        benefits: [
            'Sin azúcar agregada, ideal para quienes buscan controlar el dulzor diario.',
            'Textura crocante que suma volumen y saciedad a desayunos simples.',
            'Se combina fácil con frutas, leches vegetales o yogur natural.'
        ]
    },
    {
        id: 4,
        title: 'Granola artesanal con frutos secos 500g',
        category: 'Cereales',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: false,
        vegano: true,
        description: 'Granola artesanal con mezcla de cereales y frutos secos, ideal para sumar textura, energía y sabor a desayunos o colaciones.',
        benefits: [
            'Aporta combinación de fibra, grasas saludables y crocancia.',
            'Buena opción para acompañar yogur, frutas o smoothie bowls.',
            'Más completa que un cereal simple gracias a los frutos secos.'
        ]
    },
    {
        id: 5,
        title: 'Almendras naturales premium 250g',
        category: 'Frutos secos',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Almendras naturales seleccionadas, sin cobertura ni saborizantes, pensadas para consumir solas, activar, usar en recetas o sumar a ensaladas.',
        benefits: [
            'Fuente natural de grasas saludables, proteína vegetal y fibra.',
            'Snack práctico para sostener energía entre comidas.',
            'Producto versátil para leches vegetales, pastelería and toppings.'
        ]
    },
    {
        id: 6,
        title: 'Nueces mariposa seleccionadas 250g',
        category: 'Frutos secos',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Nueces mariposa seleccionadas, con sabor intenso y textura tierna, ideales para preparaciones dulces, ensaladas o consumo directo.',
        benefits: [
            'Aportan grasas de buena calidad y perfil nutricional completo.',
            'Suman sabor profundo sin necesidad de agregados artificiales.',
            'Ideales para combinar con miel, quesos, avena o frutas.'
        ]
    },
    {
        id: 7,
        title: 'Mix energético con pasas y maní 400g',
        category: 'Snacks',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: true,
        vegano: true,
        description: 'Mix práctico de frutos secos y frutas deshidratadas, pensado para colaciones, caminatas, jornadas largas o momentos de mucha actividad.',
        benefits: [
            'Combina energía rápida de las pasas con saciedad del maní.',
            'Formato simple para llevar en mochila, oficina o entrenamiento.',
            'Alternativa más nutritiva frente a snacks ultraprocesados.'
        ]
    },
    {
        id: 8,
        title: 'Harina integral orgánica 1kg',
        category: 'Harinas',
        image: 'assets/img/about-interior.png',
        sinTacc: false,
        vegano: true,
        description: 'Harina integral orgánica para panes, masas, budines y recetas caseras con mayor presencia de fibra y sabor cereal.',
        benefits: [
            'Conserva más partes del grano que una harina refinada tradicional.',
            'Aporta textura rústica y sabor más profundo a panificados.',
            'Ideal para quienes buscan una cocina casera más consciente.'
        ]
    },
    {
        id: 9,
        title: 'Harina de arroz sin TACC 500g',
        category: 'Sin TACC',
        image: 'assets/img/about-interior.png',
        sinTacc: true,
        vegano: true,
        description: 'Harina de arroz sin TACC, liviana y suave, pensada para preparaciones aptas para celíacos y recetas libres de gluten.',
        benefits: [
            'Libre de gluten, apta para preparaciones Sin TACC.',
            'Sabor neutro que se adapta a recetas dulces y saladas.',
            'Buena base para rebozados, masas suaves y mezclas de harinas.'
        ]
    },
    {
        id: 10,
        title: 'Galletas de avena y miel 300g',
        category: 'Galletas',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: false,
        vegano: false,
        description: 'Galletas con avena y miel, de perfil casero y simple, ideales para acompañar infusiones o resolver una merienda rápida.',
        benefits: [
            'La avena aporta fibra y una textura más rústica.',
            'La miel suma dulzor natural y aroma suave.',
            'Prácticas para tener a mano en desayunos o meriendas.'
        ]
    },
    {
        id: 11,
        title: 'Yerba mate orgánica suave 500g',
        category: 'Infusiones',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Yerba mate orgánica de perfil suave, elaborada para quienes buscan una infusión tradicional menos invasiva y de sabor equilibrado.',
        benefits: [
            'Perfil suave, ideal para quienes prefieren mates menos intensos.',
            'Proceso orgánico orientado a una producción más natural.',
            'Acompaña rutinas diarias sin perder el carácter clásico del mate.'
        ]
    },
    {
        id: 12,
        title: 'Té verde en hebras premium 100g',
        category: 'Infusiones',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: true,
        description: 'Té verde en hebras de selección premium, ideal para preparar infusiones livianas, aromáticas y con sabor vegetal delicado.',
        benefits: [
            'Rico en compuestos antioxidantes naturalmente presentes en el té.',
            'Hebras sueltas que permiten regular intensidad y cantidad.',
            'Buena alternativa para pausas livianas durante el día.'
        ]
    },
    {
        id: 13,
        title: 'Miel pura de campo 500g',
        category: 'Endulzantes',
        image: 'assets/img/gallery-detail.png',
        sinTacc: true,
        vegano: false,
        description: 'Miel pura de campo, de sabor natural y textura amable, pensada para endulzar infusiones, tostadas, yogures o preparaciones caseras.',
        benefits: [
            'Endulzante natural con aroma propio y sabor más complejo que el azúcar refinada.',
            'Ideal para combinar con frutos secos, granolas e infusiones.',
            'Aporta humedad y color a recetas de repostería casera.'
        ]
    },
    {
        id: 14,
        title: 'Azúcar mascabo integral 500g',
        category: 'Endulzantes',
        image: 'assets/img/about-interior.png',
        sinTacc: true,
        vegano: true,
        description: 'Azúcar mascabo integral con notas acarameladas, ideal para reemplazar azúcar blanca en recetas donde se busca más sabor y rusticidad.',
        benefits: [
            'Conserva un perfil más integral que el azúcar refinada.',
            'Aporta color dorado y notas de caramelo a preparaciones dulces.',
            'Funciona muy bien en budines, galletas, infusiones y granolas.'
        ]
    },
    {
        id: 15,
        title: 'Semillas de chía 250g',
        category: 'Semillas',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: true,
        vegano: true,
        description: 'Semillas de chía pequeñas y versátiles, ideales para puddings, yogures, licuados o para sumar textura y fibra a preparaciones diarias.',
        benefits: [
            'Fuente vegetal de fibra y ácidos grasos omega 3.',
            'Al hidratarse forman gel, útil para puddings y recetas veganas.',
            'Muy fáciles de incorporar sin modificar demasiado el sabor.'
        ]
    },
    {
        id: 16,
        title: 'Semillas de lino dorado 250g',
        category: 'Semillas',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: true,
        vegano: true,
        description: 'Semillas de lino dorado para sumar a desayunos, panes, crackers o preparaciones donde se busca fibra y textura natural.',
        benefits: [
            'Aportan fibra y grasas saludables de origen vegetal.',
            'Molidas se integran muy bien en masas y batidos.',
            'Pueden usarse hidratadas como sustituto vegetal en algunas recetas.'
        ]
    },
    {
        id: 17,
        title: 'Quinoa blanca seleccionada 500g',
        category: 'Legumbres',
        image: 'assets/img/about-interior.png',
        sinTacc: true,
        vegano: true,
        description: 'Quinoa blanca seleccionada, grano liviano y versátil para bowls, ensaladas tibias, guarniciones o preparaciones completas.',
        benefits: [
            'Aporta proteína vegetal y buena textura en platos principales.',
            'Se cocina rápido y combina con vegetales, semillas y legumbres.',
            'Naturalmente libre de gluten, útil para dietas variadas.'
        ]
    },
    {
        id: 18,
        title: 'Lentejas turcas peladas 500g',
        category: 'Legumbres',
        image: 'assets/img/about-interior.png',
        sinTacc: true,
        vegano: true,
        description: 'Lentejas turcas peladas, de cocción rápida y textura suave, ideales para sopas, guisos livianos, purés o hamburguesas vegetales.',
        benefits: [
            'Cocción más rápida que otras legumbres tradicionales.',
            'Fuente de proteína vegetal y fibra.',
            'Textura cremosa, perfecta para preparaciones especiadas o untables.'
        ]
    },
    {
        id: 19,
        title: 'Barrita proteica cacao y maní 50g',
        category: 'Snacks',
        image: 'assets/img/gallery-detail.png',
        sinTacc: false,
        vegano: false,
        description: 'Barrita proteica con cacao y maní, pensada como snack práctico para después de entrenar, viajes cortos o momentos de hambre entre comidas.',
        benefits: [
            'Aporta proteína en un formato fácil de llevar.',
            'El cacao y el maní dan sabor intenso y buena saciedad.',
            'Alternativa práctica frente a golosinas tradicionales.'
        ]
    },
    {
        id: 20,
        title: 'Leche de almendras sin azúcar 1L',
        category: 'Bebidas',
        image: 'assets/img/gallery-shelves.png',
        sinTacc: true,
        vegano: true,
        description: 'Bebida vegetal de almendras sin azúcar agregada, ideal para desayunos, licuados, café o recetas donde se busca una opción más liviana.',
        benefits: [
            'Sin azúcar agregada, útil para controlar el dulzor de la dieta.',
            'Alternativa vegetal para quienes evitan lácteos.',
            'Sabor suave que combina bien con café, cacao, frutas y cereales.'
        ]
    }
];

const cart = new Map();
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const productSearch = document.getElementById('productSearch');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartCount = document.getElementById('cartCount');
const orderButton = document.getElementById('orderButton');
const productModal = document.getElementById('productModal');
const productModalBody = document.getElementById('productModalBody');
let activeCategory = 'Todos';
let activeSearch = '';
let activeDietFilters = new Set();
let modalCloseTimer = null;

let currentPage = 1;
const PRODUCTS_LIMIT = 12;
let isLoading = false;
let hasMore = true;
const catalogLoader = document.getElementById('catalogLoader');
let observer = null;

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const getProductById = id => catalogProducts.find(product => String(product.id) === String(id));

const getCartTotal = () => Array.from(cart.values()).reduce((total, item) => total + item.quantity, 0);

const getProductCategories = () => [...new Set(catalogProducts.map(product => product.category))];

const renderProductFlags = product => {
    const flags = [];

    if (product.sinTacc) {
        flags.push('<img class="product-flag-icon" src="assets/img/utils/sin-gluten.png" alt="Sin TACC" title="Sin TACC" loading="lazy">');
    }

    if (product.vegano) {
        flags.push('<img class="product-flag-icon" src="assets/img/utils/vegano.png" alt="Vegano" title="Vegano" loading="lazy">');
    }

    return flags.length ? `<div class="product-flags">${flags.join('')}</div>` : '';
};

const buildWhatsAppMessage = () => {
    const lines = Array.from(cart.values()).map(item => `-${item.product.title} x${item.quantity}`);
    return `Buenos días, me gustaría hacer el siguiente pedido:\n\n${lines.join('\n')}`;
};

const updateOrderButton = () => {
    if (!orderButton) return;

    if (cart.size === 0) {
        orderButton.setAttribute('aria-disabled', 'true');
        orderButton.href = '#';
        return;
    }

    orderButton.setAttribute('aria-disabled', 'false');
    orderButton.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(buildWhatsAppMessage())}`;
};

const renderCart = () => {
    if (!cartItems || !cartEmpty || !cartCount) return;

    cartItems.innerHTML = '';
    const totalItems = getCartTotal();
    cartCount.textContent = totalItems;
    cartEmpty.style.display = cart.size === 0 ? 'block' : 'none';

    // Actualización de carrito móvil
    const mobileCartLink = document.getElementById('mobileCartLink');
    const mobileCartCount = document.getElementById('mobileCartCount');

    if (mobileCartCount) {
        if (totalItems === 0) {
            mobileCartCount.textContent = '';
        } else {
            mobileCartCount.textContent = `(${totalItems})`;
        }
    }

    if (mobileCartLink && totalItems > 0) {
        mobileCartLink.classList.remove('cart-bump');
        void mobileCartLink.offsetWidth; // Forzar reflow
        mobileCartLink.classList.add('cart-bump');
    }

    cart.forEach(({ product, quantity }) => {
        const item = document.createElement('li');
        item.className = 'cart-item';
        item.innerHTML = `
            <span class="cart-item-title">${product.title}</span>
            <div class="cart-controls" aria-label="Cantidad para ${product.title}">
                <button class="cart-control-btn" type="button" data-action="decrease" data-product-id="${product.id}" aria-label="Quitar una unidad">-</button>
                <span class="cart-quantity">${quantity}</span>
                <button class="cart-control-btn" type="button" data-action="increase" data-product-id="${product.id}" aria-label="Agregar una unidad">+</button>
            </div>
        `;
        cartItems.appendChild(item);
    });

    updateOrderButton();
};

const addToCart = productId => {
    const product = getProductById(productId);
    if (!product) return;

    const currentItem = cart.get(product.id);
    cart.set(product.id, {
        product,
        quantity: currentItem ? currentItem.quantity + 1 : 1
    });

    renderCart();
};

const decreaseFromCart = productId => {
    const product = getProductById(productId);
    if (!product) return;

    const currentItem = cart.get(product.id);
    if (!currentItem) return;

    if (currentItem.quantity <= 1) {
        cart.delete(product.id);
    } else {
        cart.set(product.id, { product, quantity: currentItem.quantity - 1 });
    }

    renderCart();
};

const openProductModal = productId => {
    const product = getProductById(productId);
    if (!product || !productModal || !productModalBody) return;

    if (modalCloseTimer) {
        window.clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
    }

    productModalBody.innerHTML = `
        <div class="product-modal__media">
            <img src="${product.image}" alt="${product.title}" class="product-modal__image">
        </div>
        <div class="product-modal__content">
            <div>
                <div class="product-meta">
                    <span class="product-badge">${product.category}</span>
                    ${renderProductFlags(product)}
                </div>
                <h2 id="modalProductTitle">${product.title}</h2>
            </div>
            
            <div class="product-modal__details-wrapper">
                <div class="product-detail-block">
                    <h3>Descripción</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-block">
                    <h3>Beneficios y propiedades</h3>
                    <ul>
                        ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <button class="btn btn-primary" type="button" data-modal-add-to-cart="${product.id}">
                Agregar al carrito
            </button>
        </div>
    `;

    productModal.classList.remove('closing');
    productModal.classList.add('active');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const addButton = productModalBody.querySelector('[data-modal-add-to-cart]');
    addButton?.addEventListener('click', () => {
        addToCart(product.id);
        
        addButton.classList.add('added');
        addButton.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
        addButton.disabled = true;
        
        setTimeout(() => {
            closeProductModal();
        }, 800);
    });
};

const closeProductModal = () => {
    if (!productModal || !productModal.classList.contains('active')) return;

    productModal.classList.remove('active');
    productModal.classList.add('closing');

    modalCloseTimer = window.setTimeout(() => {
        productModal.classList.remove('closing');
        productModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        modalCloseTimer = null;
    }, 360);
};

const renderCategoryFilter = () => {
    if (!categoryFilter) return;

    categoryFilter.innerHTML = [
        '<option value="Todos">Todos los productos</option>',
        ...apiCategories.map(cat => `<option value="${cat.name}">${cat.name}</option>`)
    ].join('');

    categoryFilter.value = activeCategory;
};

const getFilteredProducts = () => {
    const normalizedSearch = activeSearch.trim().toLowerCase();

    return catalogProducts.filter(product => {
        const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
        const searchableText = [
            product.title,
            product.category,
            product.description,
            ...product.benefits
        ].join(' ').toLowerCase();
        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

        let matchesDiet = true;
        if (activeDietFilters.has('sinTacc') && !product.sinTacc) matchesDiet = false;
        if (activeDietFilters.has('vegano') && !product.vegano) matchesDiet = false;

        return matchesCategory && matchesSearch && matchesDiet;
    });
};

const renderProducts = (appendOnly = false, newProducts = []) => {
    if (!productsGrid) return;

    const productsToRender = appendOnly ? newProducts : getFilteredProducts();

    const cardsHtml = productsToRender.map(product => `
        <article class="product-card" data-card-product-id="${product.id}" tabindex="0" role="button" aria-label="Ver detalle de ${product.title}">
            <img class="product-image" src="${product.imageCard || product.image}" alt="${product.title}" loading="lazy">
            <div class="product-content">
                <div class="product-meta">
                    <span class="product-badge">${product.category}</span>
                    ${renderProductFlags(product)}
                </div>
                <h3>${product.title}</h3>
                <button class="btn btn-primary" type="button" data-product-id="${product.id}">
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join('');

    if (appendOnly) {
        productsGrid.insertAdjacentHTML('beforeend', cardsHtml);
    } else {
        if (!productsToRender.length) {
            productsGrid.innerHTML = '<p class="cart-empty">No encontramos productos para esta búsqueda.</p>';
            return;
        }
        productsGrid.innerHTML = cardsHtml;
    }

    const cardsSelector = appendOnly 
        ? newProducts.map(p => `[data-card-product-id="${p.id}"]`).join(', ')
        : '[data-card-product-id]';

    const buttonsSelector = appendOnly
        ? newProducts.map(p => `[data-product-id="${p.id}"]`).join(', ')
        : '[data-product-id]';

    if (cardsSelector) {
        productsGrid.querySelectorAll(cardsSelector).forEach(card => {
            card.addEventListener('click', () => openProductModal(card.dataset.cardProductId));
            card.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                openProductModal(card.dataset.cardProductId);
            });
        });
    }

    if (buttonsSelector) {
        productsGrid.querySelectorAll(buttonsSelector).forEach(button => {
            button.addEventListener('click', event => {
                event.stopPropagation();
                const productId = button.dataset.productId;
                addToCart(productId);
                
                const originalText = button.innerHTML;
                button.classList.add('added');
                button.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
                button.disabled = true;
                
                setTimeout(() => {
                    button.classList.remove('added');
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 1200);
            });
        });
    }
};

const optimizeCloudinaryUrl = (url, width, height, crop = 'limit') => {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com') && !url.includes('/image/upload/')) return url;

    try {
        const parts = url.split('/image/upload/');
        if (parts.length !== 2) return url;

        const prefix = parts[0] + '/image/upload';
        const rest = parts[1];
        
        const gravity = (crop === 'fill' || crop === 'crop') ? ',g_auto' : '';
        const transformation = `c_${crop}${gravity},w_${width},h_${height},f_auto,q_auto`;

        const segments = rest.split('/');
        const firstSegment = segments[0];

        const isTransformation = firstSegment.includes(',') || 
                                 /^(c_|w_|h_|q_|f_|r_|e_|dpr_|bo_)/.test(firstSegment);

        if (isTransformation) {
            segments[0] = transformation;
            return `${prefix}/${segments.join('/')}`;
        } else {
            return `${prefix}/${transformation}/${rest}`;
        }
    } catch (e) {
        console.error('Error al optimizar URL de Cloudinary:', e);
        return url;
    }
};

const enrichProduct = (apiProduct) => {
    const attrs = apiProduct.attributes || [];
    
    const getAttrValue = (name) => {
        const attr = attrs.find(a => a.name.trim().toLowerCase() === name.toLowerCase());
        return attr ? attr.value : undefined;
    };

    const match = LOCAL_PRODUCTS_FALLBACK.find(local => 
        local.title.trim().toLowerCase() === apiProduct.name.trim().toLowerCase()
    );

    const apiSinTacc = getAttrValue('sinTACC');
    const apiVegano = getAttrValue('Vegano');
    const apiDescription = getAttrValue('Descripción');
    const apiBenefits = getAttrValue('Beneficios y propiedades');
    const apiFoto = getAttrValue('Foto');

    const title = apiProduct.name;
    const category = apiProduct.category || (match ? match.category : 'Otros');
    const nameLower = title.toLowerCase();

    let sinTacc;
    if (typeof apiSinTacc === 'boolean') {
        sinTacc = apiSinTacc;
    } else if (match && typeof match.sinTacc === 'boolean') {
        sinTacc = match.sinTacc;
    } else {
        const sinTaccKeywords = ['sin tacc', 'sin gluten', 'libre de gluten', 'apto celíacos', 'arroz', 'chía', 'lino', 'quinoa', 'lenteja', 'aceite'];
        sinTacc = sinTaccKeywords.some(keyword => nameLower.includes(keyword)) && 
                  !nameLower.includes('avena') && !nameLower.includes('trigo') && !nameLower.includes('centeno');
    }

    let vegano;
    if (typeof apiVegano === 'boolean') {
        vegano = apiVegano;
    } else if (match && typeof match.vegano === 'boolean') {
        vegano = match.vegano;
    } else {
        const veganKeywords = ['vegano', 'vegan', 'almendra', 'coco', 'arroz', 'chía', 'lino', 'quinoa', 'lenteja', 'aceite', 'cereal', 'granola'];
        vegano = veganKeywords.some(keyword => nameLower.includes(keyword)) && 
                 !nameLower.includes('miel') && !nameLower.includes('leche vacuna') && !nameLower.includes('huevo');
    }

    let description;
    if (apiDescription && typeof apiDescription === 'string' && apiDescription.trim() !== '') {
        description = apiDescription.trim();
    } else if (match && match.description) {
        description = match.description;
    } else {
        description = 'Producto de alta calidad seleccionado especialmente para nuestra propuesta saludable Estación 927.';
    }

    let benefits;
    if (Array.isArray(apiBenefits) && apiBenefits.length > 0) {
        benefits = apiBenefits.map(b => b.trim());
    } else if (match && Array.isArray(match.benefits) && match.benefits.length > 0) {
        benefits = match.benefits;
    } else {
        benefits = [
            'Seleccionado bajo estrictos estándares de pureza y calidad.',
            'Excelente opción para integrar en tus preparaciones diarias.',
            'Aporta nutrientes naturales para complementar un estilo de vida consciente.'
        ];
    }

    let rawImage = '';
    if (apiFoto && typeof apiFoto === 'string' && apiFoto.trim() !== '') {
        rawImage = apiFoto.trim();
    } else if (match && match.image) {
        rawImage = match.image;
    } else {
        const categoryLower = category.toLowerCase();
        if (categoryLower.includes('aceite')) {
            rawImage = 'assets/img/gallery-detail.png';
        } else if (categoryLower.includes('cereal') || categoryLower.includes('granola')) {
            rawImage = 'assets/img/gallery-shelves.png';
        } else if (categoryLower.includes('fruto') || categoryLower.includes('nuez') || categoryLower.includes('almendra')) {
            rawImage = 'assets/img/gallery-detail.png';
        } else if (categoryLower.includes('infusión') || categoryLower.includes('yerba') || nameLower.includes('té ') || nameLower.includes('mate')) {
            rawImage = 'assets/img/yerba-apidelta.png';
        } else if (categoryLower.includes('harina') || categoryLower.includes('legumbre') || categoryLower.includes('semilla')) {
            rawImage = 'assets/img/about-interior.png';
        } else {
            rawImage = 'assets/img/gallery-detail.png';
        }
    }

    const imageCard = optimizeCloudinaryUrl(rawImage, 400, 400, 'limit');
    const imageModal = optimizeCloudinaryUrl(rawImage, 1000, 1000, 'limit');

    return {
        id: apiProduct.id,
        title: title,
        category: category,
        image: imageModal,
        imageCard: imageCard,
        sinTacc: sinTacc,
        vegano: vegano,
        description: description,
        benefits: benefits
    };
};

let apiCategories = [];

const loadCategories = async () => {
    try {
        const response = await fetch(`${CONFIG.API_URL}/businesses/${CONFIG.BUSINESS_ID}/categories`, {
            headers: {
                'X-API-KEY': CONFIG.API_KEY,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.status}`);
        }
        apiCategories = await response.json();
    } catch (error) {
        console.warn('No se pudieron cargar las categorías desde la API. Usando las del catálogo de respaldo local:', error);
        apiCategories = [...new Set(LOCAL_PRODUCTS_FALLBACK.map(p => p.category))].map((catName, idx) => ({
            id: String(idx),
            name: catName
        }));
    }
};

const loadProducts = async (reset = false) => {
    if (isLoading) return;
    if (!reset && !hasMore) return;

    isLoading = true;
    if (catalogLoader) catalogLoader.classList.remove('hidden');

    if (reset) {
        currentPage = 1;
        hasMore = true;
        catalogProducts = [];
        if (productsGrid) productsGrid.innerHTML = '';
        if (observer && scrollSentinel) {
            observer.observe(scrollSentinel);
        }
    }

    try {
        if (currentPage === 1 && apiCategories.length === 0) {
            await loadCategories();
        }

        let categoryIdQuery = '';
        if (activeCategory !== 'Todos') {
            const categoryObj = apiCategories.find(c => c.name === activeCategory);
            if (categoryObj) {
                categoryIdQuery = `&category_id=${categoryObj.id}`;
            }
        }

        let searchQuery = '';
        if (activeSearch.trim()) {
            searchQuery = `&search=${encodeURIComponent(activeSearch.trim())}`;
        }

        const url = `${CONFIG.API_URL}/businesses/${CONFIG.BUSINESS_ID}/products?public_only=${CONFIG.PUBLIC_ONLY !== false}&page=${currentPage}&limit=${PRODUCTS_LIMIT}${categoryIdQuery}${searchQuery}`;
        const response = await fetch(url, {
            headers: {
                'X-API-KEY': CONFIG.API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const apiProducts = await response.json();
        
        if (apiProducts.length < PRODUCTS_LIMIT) {
            hasMore = false;
        }

        const enriched = apiProducts.map(enrichProduct);

        if (reset) {
            catalogProducts = enriched;
            renderProducts(false);
        } else {
            catalogProducts = [...catalogProducts, ...enriched];
            renderProducts(true, enriched);
        }

        currentPage++;
    } catch (error) {
        console.warn('No se pudo cargar los productos desde la API. Usando catálogo de respaldo local:', error);
        if (reset) {
            catalogProducts = LOCAL_PRODUCTS_FALLBACK;
            hasMore = false;
            if (apiCategories.length === 0) {
                apiCategories = [...new Set(LOCAL_PRODUCTS_FALLBACK.map(p => p.category))].map((catName, idx) => ({
                    id: String(idx),
                    name: catName
                }));
            }
            renderProducts(false);
        }
    } finally {
        isLoading = false;
        if (catalogLoader) catalogLoader.classList.add('hidden');
        if (productsGrid && reset) {
            renderCategoryFilter();
            renderCart();
        }
    }
};

if (productsGrid) {
    loadProducts(true);
}

// Setup Infinite Scroll Observer
const scrollSentinel = document.getElementById('scrollSentinel');
if (scrollSentinel) {
    const observerOptions = {
        root: null,
        rootMargin: '120px',
        threshold: 0.1
    };

    observer = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting && !isLoading && hasMore) {
                observer.unobserve(scrollSentinel);
                await loadProducts(false);
                if (hasMore) {
                    setTimeout(() => {
                        observer.observe(scrollSentinel);
                    }, 400); // 400ms delay to let the layout stabilize
                }
            }
        }
    }, observerOptions);

    observer.observe(scrollSentinel);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', event => {
        activeCategory = event.target.value;
        loadProducts(true);
    });
}

const debouncedSearch = debounce((searchValue) => {
    activeSearch = searchValue;
    loadProducts(true);
}, 300);

if (productSearch) {
    productSearch.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });
}

const dietFiltersContainer = document.getElementById('dietFilters');
if (dietFiltersContainer) {
    dietFiltersContainer.addEventListener('click', event => {
        const button = event.target.closest('.diet-filter-btn');
        if (!button) return;

        const diet = button.dataset.diet;

        if (diet === 'todos') {
            activeDietFilters.clear();
            dietFiltersContainer.querySelectorAll('.diet-filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.diet === 'todos');
            });
        } else {
            const todosBtn = dietFiltersContainer.querySelector('[data-diet="todos"]');
            todosBtn.classList.remove('active');
            
            if (activeDietFilters.has(diet)) {
                activeDietFilters.delete(diet);
                button.classList.remove('active');
            } else {
                activeDietFilters.add(diet);
                button.classList.add('active');
            }

            if (activeDietFilters.size === 0) {
                todosBtn.classList.add('active');
            }
        }
        
        renderProducts(false);
    });
}

if (cartItems) {
    cartItems.addEventListener('click', event => {
        const button = event.target.closest('[data-action]');
        if (!button) return;

        const productId = button.dataset.productId;
        if (button.dataset.action === 'increase') addToCart(productId);
        if (button.dataset.action === 'decrease') decreaseFromCart(productId);
    });
}

if (productModal) {
    productModal.addEventListener('click', event => {
        if (!event.target.closest('[data-modal-close]')) return;
        closeProductModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && productModal.classList.contains('active')) {
            closeProductModal();
        }
    });
}
