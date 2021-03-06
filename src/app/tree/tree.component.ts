import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from './tree-node';
import { TreeService } from './tree.service';
import { NodeType } from './node-type.enum';

let imgMap = new Map<string, string>();
const clusterImg: string = "assets/resources/icons/icon-cluster.png";
const hostNodeImg: string = "assets/resources/icons/icon-hdd.png";
const svmImg: string = "assets/resources/icons/icon-svm.png";
const fakeVolImg: string = "assets/resources/icons/icon-files.png";
const fakeShareImg: string = "assets/resources/icons/icon-folders.png";
const volImg: string = "assets/resources/icons/icon-file.png";
const shareImg: string = "assets/resources/icons/icon-folder.png";
imgMap.set(NodeType[NodeType.HOST], clusterImg);
imgMap.set(NodeType[NodeType.HOST_NODE], hostNodeImg);
imgMap.set(NodeType[NodeType.SVM], svmImg);
imgMap.set(NodeType[NodeType.VOLUME], volImg);
imgMap.set(NodeType[NodeType.FAKE_VOLUME], fakeVolImg);
imgMap.set(NodeType[NodeType.SHARE], shareImg);
imgMap.set(NodeType[NodeType.FAKE_SHARE], fakeShareImg);

// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
// const TREE_DATA: TreeNode[] = [
//   {
//     name: 'Cluster', img: clusterImg, warning: false
//     ,
//     childs: [
//       { name: 'HostNode', img: hostNodeImg, warning: true },
//       { name: 'Svm1', img: svmImg, warning: false },
//       { name: 'Svm2', img: svmImg, warning: false },
//     ]
//   }, {
//     name: 'Cluster2', img: clusterImg, warning: false
//     ,
//     childs: [
//       {
//         name: 'HostNode', img: hostNodeImg, warning: true,
//       }, {
//         name: 'SVM', img: svmImg, warning: false,
//         childs: [
//           {
//             name: 'Volumes', img: fakeVolImg, warning: false,
//             childs: [
//               { name: 'Volume 1', img: volImg, warning: false },
//               { name: 'Volume 2', img: volImg, warning: false }
//             ]
//           },
//           {
//             name: 'Shares', img: fakeShareImg, warning: false,
//             childs: [
//               { name: 'Share 1', img: shareImg, warning: false },
//               { name: 'Share 2', img: shareImg, warning: false }
//             ]
//           },
//         ]
//       },
//     ]
//   },
// ];

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node => node.childs);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(private treeService: TreeService) {
    console.log(NodeType[NodeType.HOST]);
  }
  ngOnInit(): void {
    this.treeService.getTreeNodes().subscribe((data) => {
      let startTime = new Date();
      this.setImg(data);
      this.dataSource.data = data;
      let endTime = new Date();
      console.log(endTime.getMilliseconds()-startTime.getMilliseconds())
    });
  }

  hasChild = (_: number, node: TreeNode) => !!node.childs && node.childs.length > 0;

  setImg(treeNodes: TreeNode[]): void {
    treeNodes.forEach(node => {
      node.img = imgMap.get(node.type);
      this.setImg(node.childs);
    });
  }

  loadChilds(node: TreeNode){
    this.treeService.getTreeNodes().subscribe().unsubscribe();
    this.treeService.getTreeNodesForHost(node).subscribe((data) => {
      console.log("Data from get host");
      console.log(data);
      this.setImg(data);
      let dataSource = this.dataSource.data;
      console.log(dataSource);
      let hostNode = dataSource[this.dataSource.data.indexOf(node)];
      console.log(hostNode);
      let childs = dataSource[this.dataSource.data.indexOf(node)].childs;
      data.forEach(node=>childs.push(node));
      dataSource[this.dataSource.data.indexOf(node)].childs=childs;
      this.dataSource.data=null;
      this.dataSource.data = dataSource;
      console.log(hostNode);
    });
  }
}