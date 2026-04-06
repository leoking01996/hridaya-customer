import React from 'react'

function Footer_() {
    return (
        <div>   {/* Footer */}
            <footer className="bg-foreground text-background py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h3 className="text-2xl font-light tracking-[0.2em] mb-4">HRIDAYA</h3>
                            <p className="text-background/70 text-sm">
                                Handcrafted candles for your sacred space
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 tracking-wider">SHOP</h4>
                            <ul className="space-y-2 text-sm text-background/70">
                                <li><a href="#" className="hover:text-accent transition-colors">All Products</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Best Sellers</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Gift Sets</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 tracking-wider">ABOUT</h4>
                            <ul className="space-y-2 text-sm text-background/70">
                                <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4 tracking-wider">CONNECT</h4>
                            <ul className="space-y-2 text-sm text-background/70">
                                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Pinterest</a></li>
                                <li><a href="#" className="hover:text-accent transition-colors">Newsletter</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
                        <p>© 2024 Hridaya. All rights reserved.</p>
                    </div>
                </div>
            </footer></div>
    )
}

export default Footer_