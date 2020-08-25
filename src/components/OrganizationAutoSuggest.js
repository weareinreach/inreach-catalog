import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {getOrgsByName} from '../utils/api';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from '@material-ui/core/styles';
import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
    active: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
    },
    inputLabel: {
        '& label': theme.custom.inputLabel,
        // '&>div': {
        //   marginTop: '20px',
        // },
        '& input': theme.custom.inputText,
        marginTop: '-5px',
        fontWeight: 'bold',
        fontSize: 17,
    },
    searchInputContainer: {
        position: 'relative',
    },
    searchInput: searchInput(theme),
    [theme.breakpoints.down('xs')]: {
        searchInput: searchInputMobile(theme),
    },
    suggestionsList: {
        margin: 0,
        padding: theme.spacing(1),
        listStyleType: 'none',
        cursor: 'pointer',
    },
    textField: {
        width: '100%',
    }
});

const AutoSuggestNew = (props, {inputProps}) => {
    const {classes} = props;
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState('');
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef(null);

    
    // Fetches organization data if user is typing in search box
    useEffect(() => {
        if (search) {
            console.log('getting it!');
            getOrgsByName(search).then((data) => {
                setOptions([...data.organizations]);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [search, options.length]);

    // Event listener detects when user clicks outside of input
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // When user clicks outside of input, suggestions disappear
    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    // Updates the search term when user erases/edits input
    const updateOrganizations = orgs => {
        console.log('name', orgs.name)
        setSearch(orgs.name);
        setDisplay(false);
        setCursor(0);
        setHovered(options[cursor]);
    };

    // Custom hook to handle keyboard arrow button press
    const useKey = (key, cb) => {
        const callbackRef = useRef(cb);
        // Cleanup
        useEffect(() => {
            callbackRef.current = cb;
        });
        // If desired key is pressed, logic will be fulfilled
        useEffect(() => {
            function handle(event) {
                if (event.which === key) {
                    callbackRef.current(event);
                }
            }
            document.addEventListener("keydown", handle);
            return () => document.removeEventListener("keypress", handle);
        }, [key]);
    }
    // Takes in key codes to allow user to select resource with keyboard
    const handleKeyDown = (event) => {
        if (event.keyCode === 40 && cursor <= options.length) {
            setCursor(cursor + 1);
        } else if (event.keyCode === 40 && cursor > options.length) {
            setCursor(0);
        }
        setHovered(options[cursor]);
    }
    const handleKeyUp = (event) => {
        if (event.keyCode === 38 && cursor) {
            if (cursor < 1) {
                setCursor(options.length)
            }
            setCursor(cursor - 1);
        } else if (event.keyCode === 38 && cursor <= 0) {
            setCursor(options.length);
        }
        setHovered(options[cursor]);
    }
    const handleEnterPress = () => {
        setSearch(hovered.name);
        setDisplay(false);
        props.handleChange(hovered.name);
    }
    // Sets search input as final value and "submits" to handleGeneralInfo
    const handleSearchUpdate = (value) => {
        setSearch(value);
        props.handleChange(value);
    }

    useKey(38, handleKeyUp);
    useKey(40, handleKeyDown);
    useKey(13, handleEnterPress);

    return (
        <>
            <FormControl ref={wrapperRef} className={classes.textField, classes.searchInputContainer}>
                <InputLabel className={classes.inputLabel} children="Resource Name:" shrink />
                <Input
                    id="auto"
                    onClick={() => setDisplay(!props.display)}
                    placeholder="Type to search for the name of a resource"
                    value={search}
                    onChange={(event) => {handleSearchUpdate(event.target.value)}}
                    {...Object.assign({}, {classes: null})}
                />
                {display && (
                    <div>
                        {options
                            .map((orgs, i) => {
                                return (
                                    <div>
                                    {hovered && (hovered.name === orgs.name) ? 
                                    <Paper
                                        onChange={() => updateOrganizations(orgs)}
                                        className={classNames(classes.suggestionsList, classes.active)}
                                        onMouseEnter={() => setHovered(orgs.name)}
                                        onClick={(event) => handleEnterPress()}
                                        key={orgs.id}
                                        tabIndex="0"
                                        square
                                    >
                                        <span>{orgs.name}</span>
                                    </Paper>
                                    : 
                                    <Paper
                                        onChange={() => updateOrganizations(orgs)}
                                        className={classNames(classes.suggestionsList)}
                                        onMouseEnter={() => setHovered(orgs)}
                                        onClick={(event) => handleEnterPress()}
                                        key={orgs.id}
                                        tabIndex="0"
                                        square
                                    >
                                        <span>{orgs.name}</span>
                                    </Paper>
                                    }
                                    </div>
                                );
                            })
                        }
                    </div>
                )}
            </FormControl>
            {!display && search === hovered.name ?
              <p style={{lineHeight:"25px"}}>Thank you for your interest in contributing to the AsylumConnect resource catalog but it looks like we've already had 
                <Link to={'/' + props.locale + '/resource/' + hovered.slug} className="hide--on-print"> {search} </Link>
                on the catalog. You can join this organization by signing up for a provider account 
                <Link to={'/' + props.locale + '/resource/' + hovered.slug}> here.</Link></p>
            : null}
        </>
    );
}

AutoSuggestNew.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AutoSuggestNew);