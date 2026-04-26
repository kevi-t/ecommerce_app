import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-distributed">
      <div class="footer-heading">
        <h1>About Us</h1>
      </div>
      <div class="footer-cols">
        <div class="footer-left">
          <h3 style="font-family: 'Times New Roman', cursive;">Ecommerce<span>&copy;</span></h3>
          <p class="footer-company-name">Your product, Our market !!!</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p><span>Ecommerce Products</span><br>Nairobi, Kenya</p>
          </div>
          <div>
            <i class="fa fa-phone"></i>
            <p>07925006394</p>
          </div>
          <div>
            <i class="fa fa-envelope"></i>
            <p><a href="mailto:kelvin&#64;gmail.com">kelvin&#64;gmail.com</a></p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>Follow Us</span>
            Connect with us on social media.
          </p>
          <div class="footer-icons">
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
