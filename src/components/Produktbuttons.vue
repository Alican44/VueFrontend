<template>
    <div>
        <div>
            <button @click="selectedProduct = 'papair'">papair</button>
            <button @click="selectedProduct = 'pullnpack'">pullnpack</button>
            <button @click="selectedProduct = 'easy2cool'">easy2cool</button>
        </div>
        <div>
            <input type="text" v-model="menge" placeholder="Menge eingeben">
        </div>
        <div>
            <button @click="submit">Submit</button>
        </div>
        <div>
            <p>Ausgewähltes Produkt: {{ selectedProduct }}</p>
            <p>Eingegebene Menge: {{ menge }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedProduct: '',
            menge: ''
        };
    },
    methods: {
        submit() {
            // Hier kannst du den Code für die Submit-Aktion einfügen
            // Du kannst auf die ausgewählten Werte zugreifen über this.selectedProduct und this.menge
            // Zum Beispiel: console.log(this.selectedProduct, this.menge);
        }
    }
};
</script>
