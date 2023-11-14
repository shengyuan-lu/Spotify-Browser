import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";
import { ArtistData } from "../../data/artist-data";
import { AlbumData } from "../../data/album-data";
import { TrackData } from "../../data/track-data";
import { ResourceData } from "../../data/resource-data";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    providers: [SpotifyService]
})
export class SearchComponent implements OnInit {
    searchString: string = "";
    searchCategory: string = "artist";
    searchCategories: string[] = ["artist", "album", "track"];
    resources: ResourceData[];

    private spotifyService: SpotifyService;

    constructor(spotifyService: SpotifyService) {
        this.spotifyService = spotifyService;
    }

    ngOnInit() {}

    async search() {
        // handle search string empty situation
        if (
            this.searchString === undefined ||
            this.searchString.trim() === ""
        ) {
            this.resources = [];
            return;
        }

        // call search function in spotifyService and parse response
        this.resources = await this.spotifyService.searchFor(
            this.searchCategory,
            this.searchString
        );
    }

    handleSearchCategoryChange() {
        this.resources = [];
    }

    protected readonly TrackData = TrackData;
}
