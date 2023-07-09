'use client';
import NotificationContext from "@/store/notification-context";
import AlgorandContext from "@/store/algorand-context";
import { useContext, useEffect, useRef, useState } from "react";
import useSWR from 'swr';
import Node from '@/components/node';
import Modal from "../ui/modal/modal";
import classes from './grid.module.css';
import Spinner from '@/components/ui/spinner/spinner';

const GRID_SIZE = 100;

const COLOR_LIST: string[] = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#FFFFFF',
  '#000000'
]

let gridCreatead = false;

const Grid: React.FC = () => {
  const { data, error } = useSWR(`/api/node`, (url) => fetch(url).then(res => res.json()));
  const [grid, setGrid] = useState<WarNode[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeNode, setActiveNode] = useState<WarNode | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');

  // Loading states
  const [updatingNode, setUpdatingNode] = useState<boolean>(false);


  const algorandCtx = useContext(AlgorandContext);
  const notificationCtx = useContext(NotificationContext);

  const messageInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickNode = (node: WarNode) => {
    if (node.assetID === -1) {
      return;
    }

    fetch(`/api/node/${node.assetID}`, {
      method: 'POST',
      body: JSON.stringify({
        id: node.assetID,
        addr: algorandCtx.accountAddress
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode !== 200) {
        notificationCtx.showNotification({ title: 'Error', message: data.message, status: 'error' });
      } else {
        setSelectedColor(node.color);
        setActiveNode(node);
        openModal();
      }
    });
  }

  const createGrid = (nodes: any) => {
    if (gridCreatead) {
      return;
    }

    const tempGrid: WarNode[] = [];

    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const gridIndx = (x * GRID_SIZE) + y;
        tempGrid[gridIndx] = {
          assetID: -1,
          x: x,
          y: y,
          color: '#000000',
          message: ''
        }
      }
    }

    Object.keys(nodes).forEach(key => {
      const node: WarNode = nodes[key] as WarNode;
      const gridIndx = (node.x * GRID_SIZE) + node.y;
      tempGrid[gridIndx] = node;
    });

    setGrid(tempGrid);
    gridCreatead = true;
  }

  const generateGrid = () => {
    return (
      grid.map((node: WarNode) => {
        return (<Node key={`${node.x}, ${node.y}`} node={node} onClickHandler={() => {onClickNode(node)}}></Node>)
      })
    )
  }

  const submitHandler = (event: any) => {
    event.preventDefault();
    setUpdatingNode(true);

    try {
      activeNode!.color = selectedColor;
      activeNode!.message = messageInputRef!.current!.value;

      fetch(`/api/node/`, {
        method: 'POST',
        body: JSON.stringify({
          node: activeNode
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode !== 201) {
          notificationCtx.showNotification({ title: 'Error', message: data.message, status: 'error' });
        } else {
          setActiveNode(null);
          closeModal();
          notificationCtx.showNotification({ title: 'Success', message: data.message, status: 'success' });
        }
        setUpdatingNode(false);
      });
    } catch (ex) {
      setUpdatingNode(false);  
    }
  }

  const createColorPicker = () => {
    return (
      COLOR_LIST.map((color: string) => {
        return (
          <li 
            className={(color === selectedColor ? `${classes.color} ${classes.active}` : `${classes.color}`)} 
            key={color} 
            style={ {backgroundColor: color} }
            onClick={() => {
              setSelectedColor(color);
            }}
          />
        )
    })
    )
  }

  useEffect(() => {
    gridCreatead = false;
    if (!data && data?.statusCode !== 200) {
      return
    }

    createGrid(data.nodes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className='grid'>
        {generateGrid()}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title={`Node (${activeNode?.x}, ${activeNode?.y})`}>
        <form onSubmit={submitHandler}>
          {updatingNode &&
            <Spinner size={50} roundCorners={true}/>
          }
          <div>
            <label htmlFor="message">Node Message</label>
            <input className={classes.inputText} type="message" id="message" ref={messageInputRef} defaultValue={activeNode?.message}/>
          </div>
          <div>
            <label htmlFor="color">Node Color</label>
            <ul className={classes.colorList}>
              {createColorPicker()} 
            </ul>
          </div>
          <input className={classes.submitButton} type="submit" value="Update Node"/>
        </form>
      </Modal>
    </>
  )
};
  
export default Grid;
