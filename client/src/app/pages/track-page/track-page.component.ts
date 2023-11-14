import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { TrackFeature } from "../../data/track-feature";
import { SpotifyService } from "../../services/spotify.service";

@Component({
    selector: "app-track-page",
    templateUrl: "./track-page.component.html",
    styleUrls: ["./track-page.component.css"]
})
export class TrackPageComponent implements OnInit {
    trackId: string;
    track: TrackData;
    audioFeatures: TrackFeature[];
    private spotifyService: SpotifyService;

    constructor(
        private route: ActivatedRoute,
        spotifyService: SpotifyService
    ) {
        this.spotifyService = spotifyService;
    }

    async ngOnInit() {
        this.trackId = this.route.snapshot.paramMap.get("id");
        // Inject the spotifyService and use it to get the track data and it's audio features
        this.track = await this.spotifyService.getTrack(this.trackId);
        //console.log(this.track);
        this.audioFeatures = await this.spotifyService.getAudioFeaturesForTrack(
            this.trackId
        );
        console.log(this.audioFeatures);
    }
}
