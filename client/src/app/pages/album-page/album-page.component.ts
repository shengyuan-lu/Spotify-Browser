import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { SpotifyService } from "../../services/spotify.service";

@Component({
    selector: "app-album-page",
    templateUrl: "./album-page.component.html",
    styleUrls: ["./album-page.component.css"]
})
export class AlbumPageComponent implements OnInit {
    albumId: string;
    album: AlbumData;
    tracks: TrackData[];

    private spotifyService: SpotifyService;

    constructor(
        private route: ActivatedRoute,
        spotifyService: SpotifyService
    ) {
        this.spotifyService = spotifyService;
    }

    async ngOnInit() {
        this.albumId = this.route.snapshot.paramMap.get("id");
        this.album = await this.spotifyService.getAlbum(this.albumId);
        this.tracks = await this.spotifyService.getTracksForAlbum(this.albumId);
    }
}
