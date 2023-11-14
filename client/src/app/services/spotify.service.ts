import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ArtistData } from "../data/artist-data";
import { AlbumData } from "../data/album-data";
import { TrackData } from "../data/track-data";
import { ResourceData } from "../data/resource-data";
import { ProfileData } from "../data/profile-data";
import { TrackFeature } from "../data/track-feature";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SpotifyService {
    expressBaseUrl: string = "http://localhost:8888";

    constructor(private http: HttpClient) {}

    private sendRequestToExpress(endpoint: string): Promise<any> {
        return firstValueFrom(
            this.http.get(this.expressBaseUrl + endpoint)
        ).then(
            (response) => {
                return response;
            },
            (err) => {
                return err;
            }
        );
    }

    async aboutMe(): Promise<ProfileData> {
        //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
        let data = await this.sendRequestToExpress("/me");

        if (data) {
            return new ProfileData(data);
        } else {
            return null as any;
        }
    }

    async searchFor(
        category: string,
        resource: string
    ): Promise<ResourceData[]> {
        //Endpoint: /search/:category/:resource
        //Depending on the category (artist, track, album), return an array of that type of data.

        let endpoint =
            "/search/" +
            encodeURIComponent(category) +
            "/" +
            encodeURIComponent(resource);

        // console.log(endpoint);

        // console.log(category);
        // console.log(resource);

        let data = await this.sendRequestToExpress(endpoint);

        if (data && data[category + "s"] && data[category + "s"]["items"]) {
            data = data[category + "s"]["items"];

            // console.log(data);

            switch (category) {
                case "artist":
                    return data.map((artist) => new ArtistData(artist));
                case "album":
                    return data.map((album) => new AlbumData(album));
                case "track":
                    return data.map((track) => new TrackData(track));
            }
        }

        return [];
    }

    async getArtist(artistId: string): Promise<ArtistData> {
        // use the artist endpoint to make a request to express.
        //Again, you may need to encode the artistId.
        // Use the artist endpoint to make a request to Express.
        const endpoint = `/artist/${encodeURIComponent(artistId)}`;

        let data = await this.sendRequestToExpress(endpoint);

        return new ArtistData(data);
    }

    async getRelatedArtists(artistId: string): Promise<ArtistData[]> {
        // Use the related artist endpoint to make a request to express and return an array of artist data.
        // Use the related artist endpoint to make a request to Express.
        const endpoint = `/artist-related-artists/${encodeURIComponent(
            artistId
        )}`;

        let data = await this.sendRequestToExpress(endpoint);

        if (data && data.artists) {
            return data.artists.map((artist) => new ArtistData(artist));
        } else {
            return [];
        }
    }

    async getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
        // use the top tracks endpoint to make a request to express.
        const endpoint = `/artist-top-tracks/${encodeURIComponent(artistId)}`; // Updated endpoint

        let data = await this.sendRequestToExpress(endpoint);

        if (data && data.tracks) {
            return data.tracks.map((trackData) => new TrackData(trackData));
        } else {
            // Handle the case when data is not in the expected format
            return [];
        }
    }

    async getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
        // use the albums for an artist endpoint to make a request to express.
        const endpoint = `/artist-albums/${encodeURIComponent(artistId)}`;

        let data = await this.sendRequestToExpress(endpoint);

        if (data && data.items) {
            const albums: AlbumData[] = data.items.map(
                (albumData: any) => new AlbumData(albumData)
            );
            return albums;
        } else {
            // Handle the case when data is not in the expected format
            return [];
        }
    }

    async getAlbum(albumId: string): Promise<AlbumData> {
        // Endpoint: /album/:id
        let endpoint: string = "/album/" + albumId;

        let data = await this.sendRequestToExpress(endpoint);

        return new AlbumData(data);
    }

    async getTracksForAlbum(albumId: string): Promise<TrackData[]> {
        // Endpoint: /album-tracks/:id
        let endpoint: string = "/album-tracks/" + albumId;

        let data = await this.sendRequestToExpress(endpoint);

        if (data && data.items) {
            return data.items.map((track) => new TrackData(track));
        } else {
            return [];
        }
    }

    async getTrack(trackId: string): Promise<TrackData> {
        // Endpoint: "/track/:id"
        let endpoint: string = "/track/" + trackId;

        let data = await this.sendRequestToExpress(endpoint);
        //console.log(data);
        return new TrackData(data);
    }

    async getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
        // Endpoint: "/track-audio-features/:id"
        let endpoint: string = "/track-audio-features/" + trackId;
        let data = await this.sendRequestToExpress(endpoint);
        // console.log("data received: ", data);
        // Parse the data and create an array of TrackFeature instances
        const trackFeatures: TrackFeature[] = TrackFeature.FeatureTypes.map(
            (featureType) => {
                const percent = data[featureType];
                return new TrackFeature(featureType, percent);
            }
        );

        return trackFeatures;
    }
}
