import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from './global.service';
import { IEdge, INode } from './interfaces';
import * as vis from 'vis-network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['app.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ndn-play';

  public pendingClickEvent?: (params: any) => void;

  public selectedNode?: INode;
  public selectedEdge?: IEdge;

  @ViewChild('networkContainer') networkContainer?: ElementRef;

  constructor(public gs: GlobalService)
  {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.gs.createNetwork(this.networkContainer?.nativeElement);

    this.gs.network?.on("click", this.onNetworkClick.bind(this));
  }

  onNetworkClick(params: any) {
    if (this.pendingClickEvent) {
      this.pendingClickEvent?.(params);
      return;
    }

    const id = this.gs.network?.getNodeAt(params.pointer.DOM);
    this.selectedNode = id ? <INode>this.gs.nodes.get(id) : undefined;

    if (!this.selectedNode) {
        const edgeId = this.gs.network?.getEdgeAt(params.pointer.DOM);
        this.selectedEdge = edgeId ? <IEdge>this.gs.edges.get(edgeId) : undefined;
    } else {
        this.selectedEdge = undefined;
    }
  }

  computeNFibs() {

  }
}
