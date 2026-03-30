import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './latelier.css';

function Latelier() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('provenance_cart')) || [];
        setCart(savedCart);
    }, []);

    const updateQuantity = (id, delta) => {
        const updated = cart.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCart(updated);
        localStorage.setItem('provenance_cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem('provenance_cart', JSON.stringify(updated));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.price * 0.85 * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="atelier-quiet-root">
            <header className="beaufort-nav">
                <h1 onClick={() => navigate('/')}>PROVENANCE</h1>
                <div className="nav-subtitle">
                    <span>REGISTRE PRIVÉ</span>
                    <span className="separator">/</span>
                    <span>PRIVATE REGISTER</span>
                </div>
            </header>

            <main className="atelier-container">
                {cart.length > 0 ? (
                    <div className="atelier-grid">
                        <div className="inventory-section">
                            <div className="section-header">
                                <span className="header-fr">Votre Sélection</span>
                                <span className="header-en">Your Selection</span>
                            </div>

                            {cart.map((item) => (
                                <div key={item.id} className="quiet-item">
                                    <div className="item-thumb-micro">
                                        <img src={item.image} alt={item.title} />
                                    </div>

                                    <div className="item-info-minimal">
                                        <div className="info-top">
                                            <h4>{item.title}</h4>
                                            <button onClick={() => removeItem(item.id)} className="btn-quiet-delete">Retirer</button>
                                        </div>

                                        <div className="info-bottom">
                                            <span className="ref-code">REF. {item.id}00—P</span>
                                            <div className="quiet-qty">
                                                <button onClick={() => updateQuantity(item.id, -1)}>—</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <span className="item-price">£{(item.price * 0.85 * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Link to="/cellar" className="btn-explore-more">
                                CONTINUER L'EXPLORATION / CONTINUE EXPLORING
                            </Link>
                        </div>

                        <aside className="protocol-section">
                            <div className="protocol-card">
                                <div className="protocol-header">
                                    <span className="header-fr">Protocole d'Acquisition</span>
                                    <span className="header-en">Acquisition Protocol</span>
                                </div>

                                <div className="protocol-summary">
                                    <div className="summary-row">
                                        <span>VALEUR TOTALE / TOTAL VALUE</span>
                                        <span className="total-value">£{calculateTotal()}</span>
                                    </div>
                                    <div className="summary-row status">
                                        <span>ALLOCATION</span>
                                        <span>SÉCURISÉE / SECURED</span>
                                    </div>
                                </div>

                                <div className="beaufort-disclaimer">
                                    Ce document constitue une intention d'acquisition privée.
                                    La validation finale est soumise à l'examen de votre lignée.
                                </div>

                                <button className="btn-finalize-ultra-thin" onClick={() => alert('Verification process initiated.')}>
                                    SOLLICITER L'ACCÈS
                                </button>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="empty-state-quiet">
                        <p>Votre inventaire est vide. / Your inventory is empty.</p>
                        <Link to="/cellar">RETOURNER AU CELLIER</Link>
                    </div>
                )}
            </main>

            <footer className="quiet-footer">
                <p>PROVENANCE — LONDON & CHAMPAGNE — EST. 1924</p>
            </footer>
        </div>
    );
}

export default Latelier;