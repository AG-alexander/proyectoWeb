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
  iframe_html: any;
  constructor(private videoService: EmbedVideoService) { }

  ngOnInit() {
    // this.iframe_html = this.videoService.embed_youtube(this.youtubeUrl, {
    //   query: { portrait: 0, color: '333' },
    //   attr: { width: 400, height: 350 }
    // });
  }

}
