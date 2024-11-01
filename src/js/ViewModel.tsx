import { createSignal, createContext, useContext } from "solid-js";
import type { Accessor, Setter } from "solid-js";
import { Tab } from "solid-bootstrap";
import { Song } from "./Song";

export enum SDType {
  SINGLE = "Single",
  DOUBLE = "Double"
}
export enum DiffType {
  b = "Beginner",
  B = "Basic",
  D = "Difficult",
  E = "Expert",
  C = "Challenge"
}

export enum SortType {
  NONE = "All Songs",
  NAME = "A-Z",
  LEVEL = "Level",
  VERSION = "Version"
}

export type ViewModel = {
  tab: Accessor<string>,
  sortBy: Accessor<SortType>,
  searchStr: Accessor<string>,
  sdType: Accessor<SDType>,
  diff: Accessor<DiffType>,
  activeGroup: Accessor<number>,
  songs: Accessor<Song[]>,
}

type SetViewModel = {
  setTab: Setter<string>,
  setSortBy: Setter<SortType>,
  setSearchStr: Setter<string>,
  setSDType: Setter<SDType>,
  setDiff: Setter<DiffType>,
  setActiveGroup: Setter<number>,
  setSongs: Setter<Song[]>,
}

const ViewModelContext = createContext();

export function ViewModelProvider(props) {
  const [tab, setTab] = createSignal("/");
  const [sortBy, setSortBy] = createSignal(SortType.VERSION);
  const [sdType, setSDType] = createSignal(SDType.SINGLE);
  const [diff, setDiff] = createSignal(DiffType.E);
  const [searchStr, setSearchStr] = createSignal("");
  const [activeGroup, setActiveGroup] = createSignal(-1);
  
  const [songs, setSongs] = createSignal<Song[]>([]);

  const viewModel = (): ViewModel => ({
    tab,
    sortBy,
    searchStr,
    sdType,
    diff,
    songs,
    activeGroup,
  })

  const setViewModel = (): SetViewModel => ({
    setTab,
    setSortBy,
    setSearchStr,
    setSDType,
    setDiff,
    setSongs,
    setActiveGroup,
  })
  
  const value = {viewModel, setViewModel};

  return (
    <ViewModelContext.Provider value={value}>
      {props.children}
    </ViewModelContext.Provider>
  );
}

export function useViewModel(): { viewModel: () => ViewModel, setViewModel: () => SetViewModel } { 
  return useContext(ViewModelContext) as any; 
}
