import { Injectable, ɵɵsetNgModuleScope } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TreeNode } from './tree-node';
import { NodeType } from './node-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  configUrl: string = "http://127.0.0.1:8080/treeNodes";

  constructor(private httpClient: HttpClient) { }

  public getTreeNodes() {
    console.log('getTreeNodes from ' + this.configUrl);
    return this.httpClient.get<TreeNode[]>(this.configUrl);
  }

  public getTreeNodesForHost(node?: TreeNode) {
    if (node) {
      if (node.type == NodeType[NodeType.HOST]) {
        console.log('get host childs from ' + this.configUrl);
        return this.httpClient.get<TreeNode[]>(this.configUrl + "?hostId=" + node.id.toString());
      }
    }
  }
}
