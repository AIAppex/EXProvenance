import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vineyard from '../../assets/img-entrance/vineyard.jpg'
import blackWine from '../../assets/img-entrance/black-wine.jpg'
import luxuryWine from '../../assets/img-entrance/luxury-wine.jpg'
import './entrance.css';

function Entrance() {
    const [status, setStatus] = useState('at-top');
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const heroHeight = window.innerHeight;

            if (currentScroll <= 10) {
                setStatus('at-top');
            } else if (currentScroll > lastScroll) {
                if (currentScroll < heroHeight) {
                    setStatus('nav-fade-out');
                } else {
                    setStatus('nav-hidden');
                }
            } else {
                setStatus('nav-logo-only');
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    return (
        <div className="main-wrapper">
            <header className={`navbar-container ${status}`}>
                <h1 className="title">PROVENANCE</h1>
                <nav className="nav-menu">
                    <ul className="nav-links">
                        <li><Link to='/heritage'>La Maison</Link></li>
                        <li><Link to='/cellar'>The Cellar</Link></li>
                        <li><Link to='/masterpiece'>The Masterpiece</Link></li>
                        <li><Link to='/latelier'>L'Atelier</Link></li>
                    </ul>
                </nav>
            </header>

            <section className="hero-section">
                <div className="hero-image"></div>
                <div className="bottom-blur-overlay"></div>
            </section>

            <section id="maison" className="section-maison">
                <div className="container">
                    <span className="section-tag">Established 1924</span>
                    <h2 className="section-title">L'ascendance du terroir.</h2>
                    <p className="section-description">
                        Nestled within the world's most prestigious terroirs, Provenance is more than an estate; 
                        it is the silent culmination of ancestral patience and an unwavering reverence for the land.
                    </p>
                    <Link to="/heritage" className="link-explore">Explore the Legacy</Link>
                </div>
            </section>

            <section id="masterpiece" className="section-masterpiece">
                <div className="split-grid">
                    <div className="split-image"></div>
                    <div className="split-content">
                        <h3>L'ŒUVRE MAGISTRALE</h3>
                        <p>
                            Two years in French oak. A singular reserve of dark fruit and profound silence. 
                            The pinnacle of the estate.
                        </p>
                        <button className="btn-dark">Enter the archive</button>
                    </div>
                </div>
            </section>

            <section className="section-details-club">
                <div className="club-border-box">
                    <div className="club-header">
                        <div className="club-icon-top">⚜</div>
                        <span className="club-tag">L'inventaire technique</span>
                        <h2 className="club-title">L'EXPÉRIENCE SENSORIELLE</h2>
                    </div>

                    <div className="club-info-grid">
                        <div className="info-item">
                            <span className="info-label">The Bouquet</span>
                            <p className="info-value">Blackberry, Truffle, Tobacco</p>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Maturation</span>
                            <p className="info-value">24 Months in French Oak</p>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Cépage</span>
                            <p className="info-value">Cabernet Sauvignon 100%</p>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Altitude</span>
                            <p className="info-value">450m Above Sea Level</p>
                        </div>
                    </div>

                    <button className="btn-archive">View Full Archive</button>
                </div>
            </section>

            <section id="cellar" className="section-geography">
                <h2 className="geography-main-title">L'obscurité éternelle</h2>
                <div className="geography-grid">
                    <div className="geo-main-card">
                        <div className="geo-img-wrapper">
                            <img src={vineyard} alt="Geography Landscape" />
                        </div>
                    </div>
                    <div className="geo-side-cards">
                        <div className="geo-side-img">
                         <img src={blackWine} alt="Detail" />
                        </div>
                        <div className="geo-side-img">
                            <img src={luxuryWine} alt="Estate" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="atelier" className="section-experience">
                <div className="experience-container">
                    <h2 className="experience-title">L'Atelier des Sens</h2>
                    <p>A private journey through our most exclusive vintages. By invitation only.</p>
                    <button className="btn-outline">Inquire for Private Tasting</button>
                </div>
            </section>

            <footer className="footer-simple">
                <p>© 2026 PROVENANCE. Pureté et Tradition.</p>
            </footer>
        </div>
    );
}

export default Entrance;