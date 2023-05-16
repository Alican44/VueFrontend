
<template>
  <header>
    <h1 class="title">KALKULATIONSTOOL LEIPA</h1>
    <br>
    <br>
    <img alt="LEIPA Logo" class="logo" src="https://leipa.shop/bilder/intern/shoplogo/logo-light.png" width="125"
      height="125" />



    <div class="wrapper">
      <div class="button-section">
        <div v-for="product in products" :key="product.name" class="product-container">
          <button @click="selectedProduct = product.name">{{ product.name }}</button>
          <input type="text" v-model="product.quantity" placeholder="Menge eingeben" />
        </div>
        <button @click="submit">Submit</button>
      </div>

      <h2 class="subtitle">Ihre Bestelldetails:</h2>


      <div class="input-section">

        <div class="input-container">
          <label for="street">Straße:</label>
          <input type="text" id="street" v-model="street" />
        </div>
        <div class="input-container">
          <label for="city">Ort:</label>
          <input type="text" id="city" v-model="city" />
        </div>
        <div class="input-container">
          <label for="zip">PLZ:</label>
          <input type="text" id="zip" v-model="zip" />
        </div>
      </div>
    </div>
  </header>
</template>



// Logikimplementation!!





<script>

import Bestellung from './JavaCodes/Bestellung.js';
import { RouterLink } from 'vue-router'


export default {
  components: {
    RouterLink
  },


  data() {

    return {
      bestellung: new Bestellung()
    }
    return {
      selectedProduct: '',
      products: [
        { name: 'papair', quantity: '' },
        { name: 'pullnpack', quantity: '' },
        { name: 'easy2cool', quantity: '' }
      ],
      street: '',
      city: '',
      zip: ''
    }
  },
  methods: {
    submit() {
      const gesamtgewicht = this.bestellung.berechneGesamtgewicht();
      console.log('Selected Product:', this.selectedProduct)
      console.log('Products:', this.products)
      console.log('Street:', this.street)
      console.log('City:', this.city)
      console.log('ZIP:', this.zip)
    }
  }
}


</script>

// CSS Design und Aussehen 


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.title {
  font-style: italic;
  text-align: center;
}

.subtitle {
  margin-top: 2rem;
}

.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.product-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.product-container button {
  margin-right: 1rem;
}

.input-section {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-container {
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background: #ff0000;
  /* Rotes Hintergrund */

}
</style>


.logo {
  display: block;
  margin: 0 auto 2rem;
}

.title {
  font-style: italic;
  text-align: center;
}

.subtitle {
  margin-top: 2rem;
}

.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.product-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.product-container button {
  margin-right: 1rem;
}

.input-section {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-container {
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background: red; 
}
