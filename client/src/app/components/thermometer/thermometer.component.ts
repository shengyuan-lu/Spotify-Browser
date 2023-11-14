import { Component, OnInit, Input } from "@angular/core";
import { TrackFeature } from "../../data/track-feature";
import * as chroma from "chroma-js";

@Component({
    selector: "app-thermometer",
    templateUrl: "./thermometer.component.html",
    styleUrls: ["./thermometer.component.css"]
})
export class ThermometerComponent implements OnInit {
    // define Input fields and bind them to the template.
    @Input() trackFeatures: TrackFeature[]; // Assuming TrackFeature is accessible in this file

    constructor() {}

    ngOnInit() {}
    // Define a method to get the color for each feature
    getColor(percent: number): string {
        // You can use your chroma.mix logic here if needed
        return chroma.mix("red", "green", percent, "hsl").hex();
    }
}
