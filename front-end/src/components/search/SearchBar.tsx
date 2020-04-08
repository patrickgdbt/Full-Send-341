import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, InputBase, fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DropDown from './DropDown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  }),
);

export default function SearchBar() {
  const classes = useStyles();

  const [criteria, setCriteria] = useState('');
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}
        onFocus={() => setShowDrop(true)}
        onBlur={() => setTimeout(() => setShowDrop(false), 100)}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <DropDown
        criteria={criteria}
        showDrop={showDrop}
      />
    </div>
  );
}