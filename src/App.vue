
<template>
  <div>
    <header>
      <h1 class="title">KALKULATIONSTOOL LEIPA</h1>
      <br>
      <br>
      <img alt="LEIPA Logo" class="logo" src="https://leipa.shop/bilder/intern/shoplogo/logo-light.png" width="125" height="125" />
    </header>

    <div class="button-section">
      <div v-for="product in products" :key="product.name" class="product-container">
        <button @click="selectedProduct = product.name">{{ product.name }}</button>
        <input type="text" v-model="product.quantity" placeholder="Menge eingeben" />
      </div>
    </div>

    <br>
    <h2>Bestelldetails:</h2>
    <br>

    <div class="button-section">
      <div class="product-container">
        <div class="detail-input">
          <input type="text" v-model="orderDetails.street" placeholder="Straße" />
        </div>
        <div class="detail-input">
          <input type="text" v-model="orderDetails.city" placeholder="Ort" />
        </div>
        <div class="detail-input">
          <input type="text" v-model="orderDetails.zip" placeholder="PLZ" />
        </div>
        <button class="save-button" @click="saveOrderDetails">Eingabe</button>
      </div>
    </div>

    

    <!-- Ausgabefelder -->
    <div class="output-section">
      <div class="output-container">
        <h3>CO2-Emissionen</h3>
        <p>{{ calculateCO2Emissions() }} kg</p>
      </div>
      <div class="output-container">
        <h3>Kosten interne Lieferung</h3>
        <p>{{ calculateInternalDeliveryCosts() }} Euro</p>
      </div>
      <div class="output-container">
        <h3>Kosten per DHL-Lieferung</h3>
        <p>{{ calculateDHLDeliveryCosts() }} Euro</p>
      </div>
    </div>

  </div>
</template>




<script>
import Bestellung from './JavaCodes/Bestellung.js'
import Kunde from './JavaCodes/Kunde.js'
import Lager from './JavaCodes/Lager.js'

export default {
  name: 'App',

  data() {
    return {
      selectedProduct: '',
      products: [
        { name: 'Papair', quantity: '' },
        { name: 'Easy2Cool', quantity: '' },
        { name: 'PullnPack', quantity: '' }
      ],
      orderDetails: {
        street: '',
        city: '',
        zip: ''
      }
    };
  },

  methods: {
    saveOrderDetails() {

      // Erzeuge eine Instanz der Klasse Kunde und übermittle die Werte
  const kunde = new Kunde(
    'kundenId', // Setze die Kunden-ID entsprechend deiner Anforderungen
    'Kunde', // Setze den Kundennamen entsprechend deiner Anforderungen
    this.orderDetails.city,
    'Lat', // Setze die Breitengrad-Koordinate entsprechend deiner Anforderungen
    'Lon', // Setze die Längengrad-Koordinate entsprechend deiner Anforderungen
    this.orderDetails.street,
    this.orderDetails.zip
  );

      // Erzeuge eine Instanz der Klasse Bestellung und übermittle die Werte
      const bestellung = new Bestellung(
        this.products.find((product) => product.name === 'Papair').quantity,
        this.products.find((product) => product.name === 'Easy2Cool').quantity,
        this.products.find((product) => product.name === 'PullnPack').quantity,
        this.orderDetails.street,
        this.orderDetailscity,
        this.orderDetails.zip
);

console.log('Bestellung:', bestellung);
},

calculateCO2Emissions() {
  // Erzeuge eine Instanz der Klasse Bestellung
    const bestellung = new Bestellung(
    this.products.find((product) => product.name === 'Papair').quantity,          // Speicjert die Mengen den jeweiligen Produkten zu
    this.products.find((product) => product.name === 'Easy2Cool').quantity,
    this.products.find((product) => product.name === 'PullnPack').quantity,
    this.orderDetails.street,
    this.orderDetails.city,
    this.orderDetails.zip
  );

  // Rufe die Methode der Bestellung auf und erhalte das Ergebnis
  const dieselverbrauch = bestellung.berechneDieselverbrauch();
  const energieverbrauch = bestellung.berechneEnergieverbrauch();
  const co2Emissions = bestellung.berechneCO2ausstoß();

  return co2Emissions;
},

calculateInternalDeliveryCosts() {
  // Hier kannst du die Berechnung der Kosten für interne Lieferung implementieren
  // Verwende die Informationen aus der Bestellung (bestellung) und anderen Daten, die du benötigst
  // Gib das Ergebnis der Berechnung zurück
  return 0; // Platzhalterwert, bitte anpassen
},

calculateDHLDeliveryCosts() {
  // Hier kannst du die Berechnung der Kosten für DHL-Lieferung implementieren
  // Verwende die Informationen aus der Bestellung (bestellung) und anderen Daten, die du benötigst
  // Gib das Ergebnis der Berechnung zurück
  return 0; // Platzhalterwert, bitte anpassen
}
}
}
</script>
