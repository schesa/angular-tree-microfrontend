import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface TreeNode {
  name: string;
  img: string;
  warning: boolean;
  children?: TreeNode[];
}

const clusterImg: string = "assets/resources/icons/icon-cluster.png";
const hostNodeImg: string = "assets/resources/icons/icon-hdd.png";
const svmImg: string = "assets/resources/icons/icon-svm.png";
const fakeVolImg: string = "assets/resources/icons/icon-files.png";
const fakeShareImg: string = "assets/resources/icons/icon-folders.png";
const volImg: string = "assets/resources/icons/icon-file.png";
const shareImg: string = "assets/resources/icons/icon-folder.png";

const TREE_DATA: TreeNode[] = [
  {
    name: 'Cluster',img:clusterImg, warning:false
  ,
    children: [
      {name: 'HostNode',img:hostNodeImg, warning:true},
      {name: 'Svm1', img: svmImg, warning:false},
      {name: 'Svm2', img: svmImg, warning:false},
    ]
  }, {
    name: 'Cluster2',img:clusterImg, warning:false
  ,
    children: [
      {
          name: 'HostNode',img:hostNodeImg, warning:true,
      }, {
        name: 'SVM',img: svmImg, warning:false,
        children: [
          {name: 'Volumes', img: fakeVolImg, warning:false,
          children: [
            {name: 'Volume 1', img: volImg, warning:false},
            {name: 'Volume 2', img: volImg, warning:false}
          ]
        },
          {name: 'Shares', img: fakeShareImg, warning:false,
          children: [
            {name: 'Share 1', img: shareImg, warning:false},
            {name: 'Share 2', img: shareImg, warning:false}
          ]
          },
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent{
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}