

class Lager {
    static lkwCounter;
    straße = "Industriestraße";
    plz = 86551;
    ort = "Aichach";
    stockLevels;

    constructor() {
        this.stockLevels = new Map();
        this.stockLevels.set("Papair", 20000);
        this.stockLevels.set("PullPack", 25000);
        this.stockLevels.set("Easy2Cool", 40000);
    }

    addDelivery(product, quantity) {
        let currentStockLevel = this.stockLevels.get(product) || 0;
        this.stockLevels.set(product, currentStockLevel + quantity);
    }

    sellProduct(product, quantity) {
        let currentStockLevel = this.stockLevels.get(product) || 0;
        if (currentStockLevel >= quantity) {
            this.stockLevels.set(product, currentStockLevel - quantity);
        } else {
            console.log("Not enough " + product + " in stock");
        }
    }

    getStockLevel(product) {
        return this.stockLevels.get(product) || 0;
    }

    countLkwNachbelieferung() {
        if (this.stockLevels.get("Papair") <= 10000) {
            Lager.lkwCounter++;
        }
        if (this.stockLevels.get("PullPack") <= 15000) {
            Lager.lkwCounter++;
        }
        if (this.stockLevels.get("Easy2Cool") <= 20000) {
            Lager.lkwCounter++;
        }
    }
}
