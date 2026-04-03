import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cellar.css';

const CATEGORIES = [
    { id: 'all',              label: 'The Archive',   filter: null },
    { id: 'fragrances',      label: 'Parfumerie',    filter: ['fragrances'] },
    { id: 'watches',         label: 'Horlogerie',    filter: ['mens-watches', 'womens-watches'] },
    { id: 'womens-dresses',  label: 'Haute Couture', filter: ['womens-dresses'] },
    { id: 'sunglasses',      label: 'Lunetterie',    filter: ['sunglasses'] },
    { id: 'womens-bags',     label: 'Maroquinerie',  filter: ['womens-bags'] },
];

const ALLOWED = CATEGORIES.flatMap(c => c.filter ?? []);

const normalizeProduct = (p, rate) => ({
    id: p.id,
    title: p.title,
    price: p.price * rate,
    image: p.thumbnail,
    category: p.category,
    brand: p.brand ?? null,
});

function Cellar() {
    const [status, setStatus] = useState('at-top');
    const [lastScroll, setLastScroll] = useState(0);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    const navigate = useNavigate();
    const EURO_CONVERSION = 0.92;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://dummyjson.com/products?limit=194')
            .then(res => res.json())
            .then(({ products: data }) => {
                const normalized = data
                    .filter(p => ALLOWED.includes(p.category))
                    .map(p => normalizeProduct(p, EURO_CONVERSION));
                setProducts(normalized);
                setFiltered(normalized);
                setLoading(false);
            })
            .catch(err => console.error('Erro ao acessar o exchange:', err));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            const hero = window.innerHeight;

            if (current <= 10) setStatus('at-top');
            else if (current > lastScroll) setStatus(current < hero ? 'heritage-nav-fade-out' : 'heritage-nav-hidden');
            else setStatus('heritage-nav-logo-only');

            setLastScroll(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const formatCurrency = val =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);

    const handleFilter = (cat) => {
        setActiveFilter(cat.id);
        setFiltered(cat.filter ? products.filter(p => cat.filter.includes(p.category)) : products);
    };

    const handleAllocation = (item) =>
        navigate('/masterpiece', { state: { selectedProduct: item } });

    const availableCategories = CATEGORIES.filter(cat =>
        !cat.filter || cat.filter.some(f => products.some(p => p.category === f))
    );

    return (
        <div className="cellar-luxury-wrapper">
            <header className={`heritage-navbar-container ${status}`}>
                <h1 className="heritage-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>PROVENANCE</h1>
                <nav className="heritage-nav-menu">
                    <ul className="heritage-nav-links">
                        <li><Link to='/heritage'>La Maison</Link></li>
                        <li><Link to='/cellar' className="active-link">The Cellar</Link></li>
                        <li><Link to='/masterpiece'>The Masterpiece</Link></li>
                        <li><Link to='/latelier'>L'Atelier</Link></li>
                    </ul>
                </nav>
            </header>

            <section className="cellar-hero-statuesque">
                <div className="cellar-hero-content">
                    <p className="cellar-exchange-tag">PROVENANCE EXCHANGE</p>
                    <h2 className="cellar-title-large">MAISON DE LUXE</h2>
                </div>
            </section>

            <section className="cellar-manifesto-quote">
                <div className="quote-container">
                    <p className="main-quote">
                        L'excellence ne se trouve pas — elle se reconnaît. Chaque pièce de la Provenance Exchange
                        est sélectionnée selon les critères les plus stricts de la tradition et du raffinement.
                    </p>
                    <cite className="quote-author">- PROVENANCE EXCHANGE, EST. 1924</cite>
                </div>
            </section>

            <nav className="cellar-filter-nav">
                {availableCategories.map(cat => (
                    <button
                        key={cat.id}
                        className={activeFilter === cat.id ? 'active' : ''}
                        onClick={() => handleFilter(cat)}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            <section className="cellar-inventory-grid">
                {loading ? (
                    <div className="cellar-loader">Seeking Excellence...</div>
                ) : filtered.length === 0 ? (
                    <div className="cellar-loader">— Collection épuisée —</div>
                ) : (
                    <div className="cellar-exhibit-grid">
                        {filtered.map(item => (
                            <div key={item.id} className="artifact-card">
                                <div className="wine-visual-frame">
                                    <span className="wine-ref-number">№ {item.id}</span>
                                    <img src={item.image} alt={item.title} className="product-api-image" />
                                </div>
                                <div className="wine-details-minimal">
                                    {item.brand && <span className="wine-brand">{item.brand}</span>}
                                    <h3 className="wine-title-refined">{item.title}</h3>
                                    <span className="wine-price-clean">{formatCurrency(item.price)}</span>
                                    <button
                                        className="btn-request-allocation"
                                        onClick={() => handleAllocation(item)}
                                    >
                                        Request Allocation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <footer className="heritage-footer-simple">
                <p>© 2026 PROVENANCE EXCHANGE. Pureté et Tradition.</p>
            </footer>
        </div>
    );
}

export default Cellar;