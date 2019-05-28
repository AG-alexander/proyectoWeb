import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() urlYoutube: string;
  youtubeUrl = '2TLB5TdSwBA';
  youtubePath = 'https://www.youtube.com/embed/';
  iframeHtml: any;
  constructor(private videoService: EmbedVideoService) { }

  ngOnInit() {
  }

}
