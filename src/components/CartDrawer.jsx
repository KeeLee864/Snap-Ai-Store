import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cart, cartOpen, setCartOpen, removeItem, updateQuantity, subtotal, freeShippingThreshold, shippingProgress, freeShippingEarned } = useCart();

  return (
    <>
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Cart ({cart.length})</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Free shipping */}
          <div className="px-4 py-3 bg-teal-50 border-b border-teal-100">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-teal-800">
                {freeShippingEarned ? '🎉 Free shipping!' : `$${(freeShippingThreshold - subtotal).toFixed(2)} away`}
              </span>
              <span className="text-teal-600 font-semibold text-xs">Free over $49</span>
            </div>
            <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(shippingProgress, 100)}%` }} />
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <span className="text-5xl mb-4">🛒</span>
                <p className="font-semibold text-gray-600">Your cart is empty</p>
                <p className="text-sm mt-1">Add Posture Pal to get started!</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-50">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-xs">−</button>
                          <span className="px-3 py-1 text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-xs">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-bold text-lg text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all"
              >
                Checkout — ${subtotal.toFixed(2)}
              </button>
              <button onClick={() => setCartOpen(false)} className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-2">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}