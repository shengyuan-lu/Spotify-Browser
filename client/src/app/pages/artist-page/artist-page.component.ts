import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { SpotifyService } from "../../services/spotify.service";

@Component({
    selector: "app-artist-page",
    templateUrl: "./artist-page.component.html",
    styleUrls: ["./artist-page.component.css"]
})
export class ArtistPageComponent implements OnInit {
    artistId: string;
    artist: ArtistData;
    relatedArtists: ArtistData[];
    topTracks: TrackData[];
    albums: AlbumData[];

    private spotifyService: SpotifyService;

    constructor(
        private route: ActivatedRoute,
        spotifyService: SpotifyService
    ) {
        this.spotifyService = spotifyService;
    }

    async ngOnInit() {
        this.artistId = this.route.snapshot.paramMap.get("id");

        // Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

        this.artist = await this.spotifyService.getArtist(this.artistId);

        this.relatedArtists = await this.spotifyService.getRelatedArtists(
            this.artistId
        );

        this.topTracks = await this.spotifyService.getTopTracksForArtist(
            this.artistId
        );

        this.albums = await this.spotifyService.getAlbumsForArtist(
            this.artistId
        );
    }
}
