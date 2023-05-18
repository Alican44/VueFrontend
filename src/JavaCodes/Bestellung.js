var EARTH_RADIUS = 6371;

export default class Bestellung {

    constructor(papair, easy2Cool, pullPack, mengePapair, mengeEasy2Cool, mengePullPack, kunde, gesamtgewicht, entfernung, dieselverbrauch, energieverbrauch, co2ausstoß) {
        this.papair = papair;
        this.easy2Cool = easy2Cool;
        this.pullPack = pullPack;
        this.mengePapair = mengePapair;
        this.mengeEasy2Cool = mengeEasy2Cool;
        this.mengePullPack = mengePullPack;
        this.kunde = kunde;
        this.gesamtgewicht = this.berechneGesamtGewicht();
        this.entfernung = entfernung;
        this.dieselverbrauch = dieselverbrauch;
        this.energieverbrauch = energieverbrauch;
        this.co2ausstoß = co2ausstoß;
    }

    berechneGesamtGewicht() {
        return (this.mengePapair * this.papair.gewicht) + (this.mengeEasy2Cool * this.easy2Cool.gewicht) + (this.mengePullPack * this.pullPack.gewicht);
    }

    berechneDieselverbrauch() {
        return (this.entfernung * this.energieverbrauch) / 100;
    }

    berechneEnergieverbrauch(lkwVerbrauch, rohkapazitaet, nutzlast) {
        return (lkwVerbrauch + (rohkapazitaet - nutzlast)) * (this.mengeEasy2Cool + this.mengePullPack + this.mengePapair) / this.gesamtgewicht;
    }

    berechneCO2ausstoß(lkwVerbrauch, rohkapazitaet, nutzlast) {
        return this.entfernung * 26.5 * this.berechneEnergieverbrauch(lkwVerbrauch, rohkapazitaet, nutzlast);
    }

    berechneExtern() {
        const kosten = [4.50, 5.20, 6.15, 7.75, 11.95, 13.95];
        const gewichte = [1.0, 3.0, 5.0, 10.0, 20.0, 31.5];
        let summe = 0.0;
        let kostenIndex = -1;
        let gw = this.gesamtgewicht;

        while (gw > 0) {
            for (let i = 0; i < gewichte.length; i++) {
                if (gw <= gewichte[i]) {
                    kostenIndex = i;
                    break;
                }
            }

            if (kostenIndex === -1) {
                kostenIndex = gewichte.length - 1;
            }

            summe += kosten[kostenIndex];
            gw -= gewichte[kostenIndex];
        }

        summe = Math.round(summe * 100) / 100;
        return summe;
    }

    berechneIntern() {
        let anzahlLKWs;
        const roundedWeight = Math.ceil(gesamtgewicht);

        if (roundedWeight <= 7500) {
            anzahlLKWs = 1;
        } else if (roundedWeight <= 15000) {
            anzahlLKWs = 2;
        } else {
            anzahlLKWs = 3;
        }

        let shippingCost;
        if (kunde.plz >= 0 && kunde.plz <= 9999) {
            shippingCost = 53;
        } else if (kunde.plz >= 10000 && kunde.plz <= 19999) {
            shippingCost = 68;
        } else if (kunde.plz >= 20000 && kunde.plz <= 29999) {
            shippingCost = 80;
        } else if (kunde.plz >= 30000 && kunde.plz <= 39999) {
            shippingCost = 60;
        } else if (kunde.plz >= 40000 && kunde.plz <= 49999) {
            shippingCost = 54;
        } else if (kunde.plz >= 50000 && kunde.plz <= 59999) {
            shippingCost = 50;
        } else if (kunde.plz >= 60000 && kunde.plz <= 69999) {
            shippingCost = 48;
        } else if (kunde.plz >= 70000 && kunde.plz <= 79999) {
            shippingCost = 25;
        } else if (kunde.plz >= 80000 && kunde.plz <= 89999) {
            shippingCost = 24;
        } else if (kunde.plz >= 90000 && kunde.plz <= 99999) {
            shippingCost = 40;
        } else {
            throw new Error("Ungültige Postleitzahl");
        }

        const totalCost = anzahlLKWs * shippingCost;
        return totalCost;
    }

    einzelneLieferung(bestellung) {
        const gesamtEntfernung = calcEntfernungEinzelneLieferungen();
        this.entfernung = gesamtEntfernung;
        const gesamtGewicht = berechneGesamtGewicht();
        const dieselVerbrauch = berechneDieselverbrauch();
        const energieverbrauch = berechneEnergieverbrauch(40, 30, 40);
        const co2ausstoß = berechneCO2ausstoß(40, 30, 40);

        console.log("Entfernung von " + kunde.ort + " nach " + pullPack.ort + " = " + distance(kunde.ort, pullPack.ort, kunde.straße, pullPack.straße));
        console.log("Entfernung von " + kunde.ort + " nach " + papair.ort + " = " + distance(kunde.ort, papair.ort, kunde.straße, papair.straße));
        console.log("Entfernung von " + kunde.ort + " nach " + easy2Cool.ort + " = " + distance(kunde.ort, easy2Cool.ort, kunde.straße, easy2Cool.straße));

        console.log("Gesamtkilometer: " + gesamtEntfernung);
        console.log("Gesamtgewicht der Bestellung: " + gesamtGewicht);
        console.log("Gesamter Dieselverbrauch: " + dieselVerbrauch);
        console.log("Gesamter CO2 Ausstoß: " + co2ausstoß);


    }

    zentralLagerBelieferung(bestellung, lager) {
        const entfernung = calcEntfernungZentrallager(lager, bestellung.kunde);
        const gesamtGewicht = berechneGesamtGewicht();
        const dieselVerbrauch = berechneDieselverbrauch();
        const energieverbrauch = berechneEnergieverbrauch(40, 30, 40);
        const co2ausstoß = berechneCO2ausstoß(40, 30, 40);

        console.log("Gesamtkilometer: " + entfernung);
        console.log("Gesamtgewicht der Bestellung: " + gesamtGewicht);
        console.log("Gesamter Dieselverbrauch: " + dieselVerbrauch);
        console.log("Gesamter CO2 Ausstoß: " + co2ausstoß);
        // console.log("Energieverbrauch: " + energieverbrauch);
    }



    distance(cityFrom, cityTo, straßeFrom, straßeTo) {

        const coordsFrom = getCoordinates(cityFrom, straßeFrom);
        const coordsTo = getCoordinates(cityTo, straßeTo);

        const deltaLat = toRadians(coordsTo[0] - coordsFrom[0]);
        const deltaLon = toRadians(coordsTo[1] - coordsFrom[1]);

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(toRadians(coordsFrom[0])) *
            Math.cos(toRadians(coordsTo[0])) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = EARTH_RADIUS * c;

        return distance;
    }

    getCoordinates(standort, straße) {
        const de = "Deutschland";
        const jOpenCageGeocoder = new JOpenCageGeocoder("e8c0426e8e914eb7b180b0f08aaec749");
        const request = new JOpenCageForwardRequest("Kazboeckstraße", standort, de);
        request.setRestrictToCountryCode("de"); // restrict results to a specific country
        request.setBounds(5.53711, 47.15984, 15.16113, 55.12865); // restrict results to a geographic bounding box (southWestLng, southWestLat, northEastLng, northEastLat)

        const response = jOpenCageGeocoder.forward(request);
        const firstResultLatLng = response.getFirstPosition(); // get the coordinate pair of the first result

        return [firstResultLatLng.getLat(), firstResultLatLng.getLng()];
    }

    calcEntfernungEinzelneLieferungen() {
        const gesamtEntfernung =
            distance(kunde.ort, pullPack.ort, kunde.straße, pullPack.straße) +
            distance(kunde.ort, papair.ort, kunde.straße, papair.straße) +
            distance(kunde.ort, easy2Cool.ort, kunde.straße, easy2Cool.straße);
        return gesamtEntfernung;
    }

    calcEntfernungZentrallager(lager, kunde) {
        const entfernung = distance(lager.ort, kunde.ort, lager.straße, kunde.straße);
        return entfernung;
    }


}