import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './masterpiece.css';

function Masterpiece() {
    const [status, setStatus] = useState('at-top');
    const lastScroll = useRef(0);
    const ticking = useRef(false);

    const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.selectedProduct;

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.scrollY;

                    if (currentScroll <= 10) {
                        setStatus('at-top');
                    } else if (currentScroll > lastScroll.current) {
                        setStatus('nav-hidden');
                    } else {
                        setStatus('nav-logo-only');
                    }

                    lastScroll.current = currentScroll;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAcquisition = () => {
        if (!product) return;
        const existingCart = JSON.parse(localStorage.getItem('provenance_cart')) || [];
        const itemIndex = existingCart.findIndex(item => item.id === product.id);

        if (itemIndex > -1) {
            existingCart[itemIndex].quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('provenance_cart', JSON.stringify(existingCart));
        navigate('/latelier');
    };

    return (
        <div className="masterpiece-editorial-root obsidian-theme">
            <header className={`navbar-container ${status}`}>
                <h1 className="title" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>PROVENANCE</h1>
                <nav className="nav-menu">
                    <ul className="nav-links">
                        <li><Link to='/heritage'>La Maison</Link></li>
                        <li><Link to='/cellar'>The Cellar</Link></li>
                        <li><Link to='/masterpiece' className="active">The Masterpiece</Link></li>
                        <li><Link to='/latelier'>L'Atelier</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="editorial-flow">
                <section className="ed-section-hero">
                    <div className="ed-hero-visual"></div>
                    <div className="ed-hero-text">
                        <span className="ed-label">Volume I — The Archives</span>
                        <h2 className="ed-display-title">L'ESTHÉTIQUE <br /> <span className="italic">DE L'OMBRE</span></h2>
                        <p className="ed-hero-subtext">A private descent into the sanctuary of our most guarded items.</p>
                        <div className="ed-scroll-line"></div>
                    </div>
                </section>

                {product ? (
                    <section className="ed-allocation-reveal">
                        <div className="allocation-card-premium ice-white-theme">
                            <div className="alloc-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="alloc-details">
                                <div className="alloc-header-nav">
                                    <Link to="/cellar" className="btn-back-minimal">← Return to Cellar</Link>
                                    <span className="alloc-status">Confirmed Allocation</span>
                                </div>

                                <h2 className="alloc-title">{product.title}</h2>
                                <p className="alloc-desc">
                                    {product.brand
                                        ? `Une création exclusive de ${product.brand}, sélectionnée par les archives de la Provenance Exchange pour sa singularité et son excellence.`
                                        : `Une pièce rare issue des archives de la Provenance Exchange, sélectionnée selon les critères les plus stricts de la tradition.`
                                    }
                                </p>

                                <div className="alloc-meta">
                                    <div className="meta-item">
                                        <span>Reference</span>
                                        <strong>BEAU-{product.id}</strong>
                                    </div>
                                    <div className="meta-item privilege">
                                        <span>Privilège (—15%)</span>
                                        <strong>€{(product.price * 0.85).toFixed(2)}</strong>
                                    </div>
                                </div>

                                <button className="btn-finalize-private" onClick={handleAcquisition}>
                                    Acquire Vessel
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="ed-no-selection">
                        <div className="no-selection-content">
                            <p>Votre sélection est vide. / Your selection is empty.</p>
                            <Link to="/cellar" className="btn-return-cellar">Return to Cellar</Link>
                        </div>
                    </section>
                )}

                <section className="ed-section-philosophy">
                    <div className="ed-philosophy-grid">
                        <div className="ph-item">
                            <span>01</span>
                            <h5>Le Terroir Absolu</h5>
                            <p>The earth dictates the rhythm; we are merely the silent stewards of its ancestral pulse.</p>
                        </div>
                        <div className="ph-item">
                            <span>02</span>
                            <h5>L'Irrépétable</h5>
                            <p>We release limited editions per cycle. Not to satisfy demand, but to ensure integrity.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer-simple">
                <p>© 2026 PROVENANCE. Selected by Merit. Bound by Legacy.</p>
            </footer>
        </div>
    );
}

export default Masterpiece;