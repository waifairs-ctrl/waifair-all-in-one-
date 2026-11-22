import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Lock,
  Store,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  X,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { storeContacts } = useStore();
  const [activeModal, setActiveModal] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const cleanWhatsAppNumber = (storeContacts.whatsapp || storeContacts.phone || '').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-300 text-sm mt-auto border-t border-slate-800">
      {/* 1. Value Proposition Strip */}
      <div className="border-b border-slate-800 bg-slate-900/90 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-2xl border border-amber-400/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Waifair Quality Guarantee</h5>
              <p className="text-xs text-slate-400">Verified authentic laptops, tech & goods</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Fast 24-48h Dispatch</h5>
              <p className="text-xs text-slate-400">Directly routed to certified sellers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Escrow Wallet Protection</h5>
              <p className="text-xs text-slate-400">100% secure buyer & seller payments</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/10 text-amber-300 rounded-2xl border border-amber-400/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">24/7 Live Customer Desk</h5>
              <p className="text-xs text-slate-400">{storeContacts.workingHours || 'Instant chat assistance & order updates'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Contacts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow-md">
                W
              </div>
              <span className="text-2xl font-serif font-black tracking-tight text-white">
                Waifair<span className="text-amber-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Waifair Shopping Store — An all-in-one verified destination for laptops, graphic cards, smartphones, high-performance tech, smart home appliances, and lifestyle goods.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium">Waifair Network Operational</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Buyer Protection & SSL</span>
              </div>
              <p className="text-[11px] text-slate-500">30-Day Easy Returns Guarantee</p>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span>Customer Help</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shop All Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('customer')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Track Order & Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('customer')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Customer Support Chat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModal({
                      title: 'Shipping & Fast 24-48h Delivery',
                      content: (
                        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                          <p>
                            All orders placed on Waifair are immediately verified and routed to certified merchants within our verified direct-fulfillment network.
                          </p>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-amber-400">
                              <Truck className="w-4 h-4" />
                              <span>Dispatch & Tracking Timelines:</span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-slate-400">
                              <li><strong>Dispatch:</strong> Orders are processed and dispatched within 24 to 48 hours of payment confirmation.</li>
                              <li><strong>Standard Delivery:</strong> 3 to 5 business days across US and international hubs.</li>
                              <li><strong>Free Express Shipping:</strong> Included on all orders above $35.00.</li>
                              <li><strong>Real-time Tracking:</strong> Full tracking IDs provided with live checkpoints in your Customer Portal.</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    })
                  }
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Shipping & Fast 24h Delivery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModal({
                      title: '30-Day Money Back Guarantee',
                      content: (
                        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                          <p>
                            Every purchase on Waifair is backed by our unconditional 30-day money-back guarantee.
                          </p>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-emerald-400">
                              <ShieldCheck className="w-4 h-4" />
                              <span>Buyer Refund Highlights:</span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-slate-400">
                              <li>Full refund if item is not as described, damaged, or delayed beyond guaranteed arrival window.</li>
                              <li>Free return postage provided for all verified defective claims.</li>
                              <li>Refunds processed directly back to your original payment method (Bank Card or USDT).</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    })
                  }
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  30-Day Money Back Guarantee
                </button>
              </li>
            </ul>
          </div>

          {/* Seller Program */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Waifair Sellers</span>
            </h4>
            <div className="mb-3">
              <button
                id="footer-apply-now-btn"
                onClick={() => onNavigate('become-seller')}
                className="w-full px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Apply Now</span>
                <span>→</span>
              </button>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('become-seller')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  Seller Benefits & Requirements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('seller')}
                  className="hover:text-white transition-colors"
                >
                  Merchant Seller Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('seller')}
                  className="hover:text-white transition-colors"
                >
                  Seller Escrow Wallets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModal({
                      title: 'Fast Merchant Payouts (Bank Wire, TRC20 USDT, PayPal)',
                      content: (
                        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                          <p>
                            Waifair guarantees rapid 24-hour settlements for merchant sales upon order delivery confirmation.
                          </p>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-amber-400">
                              <Lock className="w-4 h-4" />
                              <span>Supported Settlement Channels:</span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-slate-400">
                              <li><strong>Crypto USDT (TRC20):</strong> Instant automated payout directly to your verified wallet address.</li>
                              <li><strong>Direct Bank Wire / ACH:</strong> Same-day domestic & SEPA wire transfers.</li>
                              <li><strong>PayPal / Stripe:</strong> Direct transfer to verified merchant email.</li>
                              <li><strong>Escrow Guarantee:</strong> 100% protection against chargebacks and fraudulent disputes.</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    })
                  }
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Fast Payouts (Bank, Crypto USDT)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us (Dynamic from Admin Settings) */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Contacts</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              {storeContacts.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="leading-snug text-slate-300">{storeContacts.address}</span>
                </div>
              )}

              {storeContacts.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-amber-400" />
                  <a
                    href={`tel:${storeContacts.phone}`}
                    className="text-slate-200 hover:text-amber-400 font-medium transition-colors"
                  >
                    {storeContacts.phone}
                  </a>
                </div>
              )}

              {storeContacts.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-amber-400" />
                  <a
                    href={`mailto:${storeContacts.email}`}
                    className="text-slate-200 hover:text-amber-400 font-medium transition-colors"
                  >
                    {storeContacts.email}
                  </a>
                </div>
              )}

              {storeContacts.whatsapp && (
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <a
                    href={`https://wa.me/${cleanWhatsAppNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                  >
                    <span>WhatsApp Support</span>
                    <span className="text-slate-400 font-normal">({storeContacts.whatsapp})</span>
                  </a>
                </div>
              )}

              {storeContacts.workingHours && (
                <div className="flex items-start gap-2.5 pt-1 text-slate-400">
                  <Clock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="text-[11px] leading-tight">{storeContacts.workingHours}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            onClick={(e) => {
              // Stealth triple-click trigger for owner to access admin without any visible button
              if (e.detail === 3) {
                onNavigate('admin');
              }
            }}
            className="cursor-default select-none"
            title="Waifair Store"
          >
            © 2016 Waifair Shopping Store. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
            <button
              type="button"
              onClick={() =>
                setActiveModal({
                  title: 'Privacy Policy',
                  content: (
                    <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                      <p>
                        Your privacy is critically important to Waifair. We adhere to industry-standard data encryption, GDPR, and consumer privacy regulations.
                      </p>
                      <div className="space-y-2">
                        <h5 className="font-bold text-white text-xs">1. Information Collection & Usage</h5>
                        <p className="text-slate-400">
                          We only collect details necessary to process and fulfill your orders (name, email, shipping address, contact phone). We never sell your personal data.
                        </p>
                        <h5 className="font-bold text-white text-xs">2. Payment Security & Encryption</h5>
                        <p className="text-slate-400">
                          All transactions are encrypted with 256-bit TLS/SSL encryption. We do not store raw credit card numbers or banking secrets client-side.
                        </p>
                        <h5 className="font-bold text-white text-xs">3. Data Retention & Control</h5>
                        <p className="text-slate-400">
                          You may request export or deletion of your customer account profile and orders history at any time through our Support Desk.
                        </p>
                      </div>
                    </div>
                  ),
                })
              }
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() =>
                setActiveModal({
                  title: 'Terms of Use',
                  content: (
                    <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                      <p>
                        Welcome to Waifair. By browsing, creating an account, or placing an order on our platform, you agree to these Terms of Use.
                      </p>
                      <div className="space-y-2">
                        <h5 className="font-bold text-white text-xs">1. Marketplace Platform Structure</h5>
                        <p className="text-slate-400">
                          Waifair connects verified buyers with certified merchant sellers. Orders are fulfilled directly by vetted merchants or certified partner distribution centers.
                        </p>
                        <h5 className="font-bold text-white text-xs">2. Customer Responsibilities</h5>
                        <p className="text-slate-400">
                          Customers agree to provide accurate shipping addresses. Any disputes or transit delays are monitored and resolved under our Buyer Protection policy.
                        </p>
                        <h5 className="font-bold text-white text-xs">3. Seller Standards</h5>
                        <p className="text-slate-400">
                          Merchants must maintain a minimum 98% fulfillment compliance score and adhere to guaranteed dispatch within 48 hours.
                        </p>
                      </div>
                    </div>
                  ),
                })
              }
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() =>
                setActiveModal({
                  title: 'Buyer Protection Guarantee',
                  content: (
                    <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                      <p>
                        Shop with absolute confidence on Waifair. Every single order is covered by our end-to-end Escrow & Buyer Protection system.
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>100% Escrow Protection:</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400">
                          <li><strong>Escrow Safekeeping:</strong> Your payment is held in escrow until the carrier confirms successful physical delivery.</li>
                          <li><strong>Full Refund:</strong> If your package does not arrive or differs significantly from the catalog description.</li>
                          <li><strong>Instant Resolution:</strong> 24/7 dedicated Customer Care mediation via Live Chat.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                })
              }
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Buyer Protection Guarantee
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Information Policy Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-white">{activeModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-1">
              {activeModal.content}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

