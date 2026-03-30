import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import barril from '../../assets/img-heritage/barril.jpg';
import grapes from '../../assets/img-heritage/grapes.jpg';
import luxuryWineHeritage from '../../assets/img-heritage/luxury-wine-heritage.jpg';
import './heritage.css';

function Heritage() {
    const [status, setStatus] = useState('at-top');
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
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

    return (
        <div className="heritage-main-wrapper">
            <header className={`heritage-navbar-container ${status}`}>
                <h1 className="heritage-title">PROVENANCE</h1>
                <nav className="heritage-nav-menu">
                    <ul className="heritage-nav-links">
                        <li><Link to='/heritage' className="active-link">La Maison</Link></li>
                        <li><Link to='/cellar'>The Cellar</Link></li>
                        <li><Link to='/masterpiece'>The Masterpiece</Link></li>
                        <li><Link to='/latelier'>L'Atelier</Link></li>
                    </ul>
                </nav>
            </header>

            <section className="heritage-hero-section">
                <div className="heritage-hero-image"></div>
                <div className="heritage-hero-content-wrapper">
                    <h2 className="heritage-hero-title">L'ARBITRE DES SIÈCLES</h2>
                    <p className="heritage-hero-subtitle">⚜</p>
                </div>
                <div className="heritage-bottom-blur-overlay"></div>
            </section>

            <section className="heritage-philosophy">
                <div className="heritage-inner-narrow">
                    <span className="heritage-meta">Chapitre I</span>
                    <h2 className="heritage-serif-title">L'esthétique de l'ombre</h2>
                    <p className="heritage-lead-text">
                        True luxury never clamours for attention; it waits within the silence of our granite vaults. It is the definitive line between being noticed and being remembered.
                    </p>
                </div>
            </section>

            <section className="heritage-visual-narrative">
                <div className="heritage-bw-grid">
                    <div className="heritage-bw-item big">
                        <img src={barril} alt="Legacy" className="heritage-grayscale" />
                    </div>
                    <div className="heritage-bw-item">
                        <img src={grapes} alt="Craft" className="heritage-grayscale" />
                    </div>
                    <div className="heritage-bw-item">
                        <img src={luxuryWineHeritage} alt="Object" className="heritage-grayscale" />
                    </div>
                </div>

                <div className="heritage-chapter-divider">
                    <div className="heritage-vertical-line"></div>
                    <span className="heritage-meta">Chapitre II</span>
                </div>
            </section>

            <section className="heritage-scarcity">
                <div className="heritage-split-minimal">
                    <div className="heritage-split-text">
                        <h2 className="heritage-serif-title">L'unique et l'irrépétable</h2>
                        <p>
                            We release but twelve hundred bottles per cycle. Each vessel is a legacy, secured by an individual record of custody. We do not produce; we preserve.
                        </p>
                        <div className="heritage-signature">Provenance Heritage Estate</div>
                    </div>
                    <div className="heritage-split-empty"></div>
                </div>
            </section>

            <section className="heritage-access-gate">
                <div className="heritage-gate-content">
                    <div className="heritage-line-divider"></div>
                    <h2 className="heritage-serif-title">L'INVENTAIRE OCCULTE</h2>
                    <p>Access to our historic inventory is not a public right. It is a distinction conferred solely through lineage or cultural merit.</p>
                    <div className="heritage-button-group">
                        <button className="heritage-btn-ghost">Request Protocol</button>
                        <button className="heritage-btn-ghost">View Archive</button>
                    </div>
                </div>
            </section>

            <footer className="heritage-footer-simple">
                <p>© 2026 PROVENANCE. Pureté et Tradition.</p>
            </footer>
        </div>
    );
}

export default Heritage;