import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cellar.css';

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
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                const normalizedData = data.map(p => ({
                    ...p,
                    price: p.price * EURO_CONVERSION
                }));
                setProducts(normalizedData);
                setFiltered(normalizedData);
                setLoading(false);
            })
            .catch(err => console.error("Erro ao acessar a adega:", err));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const heroHeight = window.innerHeight;

            if (currentScroll <= 10) {
                setStatus('at-top');
            } else if (currentScroll > lastScroll) {
                if (currentScroll < heroHeight) {
                    setStatus('heritage-nav-fade-out');
                } else {
                    setStatus('heritage-nav-hidden');
                }
            } else {
                setStatus('heritage-nav-logo-only');
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
        }).format(val);
    };

    const handleFilter = (cat) => {
        setActiveFilter(cat);
        setFiltered(cat === 'all' ? products : products.filter(p => p.category === cat));
    };

    const handleAllocation = (item) => {
        navigate('/masterpiece', { state: { selectedProduct: item } });
    };

    return (
        <div className="cellar-luxury-wrapper">
            <header className={`heritage-navbar-container ${status}`}>
                <h1 className="heritage-title" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>PROVENANCE</h1>
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
                    <h2 className="cellar-title-large">RARE CASK Collection</h2>
                </div>
            </section>

            <section className="cellar-manifesto-quote">
                <div className="quote-container">
                    <p className="main-quote">
                        Whilst the singularity of a Rare Cask remains a gift of providence, the mastery of its inception is a legacy of sacred transmission.
                    </p>
                    <cite className="quote-author">- LES ALLIANCES ÉLUES</cite>
                </div>
            </section>

            <nav className="cellar-filter-nav">
                {[
                    { id: 'all', label: 'The Archive' },
                    { id: "women's clothing", label: "L'Élégance Féminine" },
                    { id: "men's clothing", label: "Heritage Apparel" },
                    { id: "jewelery", label: "Fine Ornaments" },
                    { id: "electronics", label: "Instruments" }
                ].map(cat => (
                    <button
                        key={cat.id}
                        className={activeFilter === cat.id ? 'active' : ''}
                        onClick={() => handleFilter(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            <section className="cellar-inventory-grid">
                {loading ? <div className="cellar-loader">Seeking Excellence...</div> : (
                    <div className="cellar-exhibit-grid">
                        {filtered.map((item) => (
                            <div key={item.id} className="artifact-card">
                                <div className="wine-visual-frame">
                                    <span className="wine-ref-number">№ {item.id}</span>
                                    <img src={item.image} alt={item.title} className="product-api-image" />
                                </div>
                                <div className="wine-details-minimal">
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
                <p>© 2026 PROVENANCE. Pureté et Tradition.</p>
            </footer>
        </div>
    );
}

export default Cellar;