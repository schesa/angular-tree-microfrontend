import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from './tree-node';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  configUrl: string = "http://127.0.0.1:8080/treeNodes";

  constructor(private httpClient: HttpClient) { }

  getTreeNodes() {
    console.log('getTreeNodes from ' + this.configUrl);
    return this.httpClient.get<TreeNode[]>(this.configUrl);
  }
}
