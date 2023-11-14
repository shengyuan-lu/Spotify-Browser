import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";
import { ProfileData } from "../../data/profile-data";

// designates class as a component
@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"],
    providers: [SpotifyService]
})
export class AboutComponent implements OnInit {
    name: string = null;
    profile_pic: string = "../../../assets/unknown.jpg";
    profile_link: string = null;

    // inject the Spotify service
    private spotifyService: SpotifyService;

    constructor(spotifyService: SpotifyService) {
        this.spotifyService = spotifyService;
    }

    ngOnInit() {
        this.loadAboutMe();
    }

    /* create a function which gets the "about me" information from Spotify when the button in the view is clicked.
    In that function, update the name, profile_pic, and profile_link fields */
    async loadAboutMe() {
        let profileData: ProfileData = await this.spotifyService.aboutMe();

        if (profileData) {
            this.name = profileData.name;
            this.profile_pic = profileData.imageURL;
            this.profile_link = profileData.spotifyProfile;
        }
    }
}
