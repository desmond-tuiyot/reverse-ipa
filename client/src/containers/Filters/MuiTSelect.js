import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 100,
    fontSize: "0.8rem",
    background: "white",
    color: deepPurple[500],
    fontWeight: 400,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 5,
    padding: theme.spacing(1, 2),
    boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
    "&:focus": {
      borderRadius: 12,
      background: "white",
      borderColor: deepPurple[100],
    },
  },

  icon: {
    color: deepPurple[300],
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },

  paper: {
    borderRadius: 12,
    marginTop: 8,
  },

  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    "& li": {
      fontWeight: 400,
      fontSize: "0.75rem",
      padding: theme.spacing(1.3, 2),
    },
    "& li:hover": {
      background: deepPurple[100],
    },
    "& li.Mui-selected": {
      color: "white",
      background: deepPurple[400],
    },
    "& li.Mui-selected:hover": {
      background: deepPurple[500],
    },
  },
}));

const MuiTSelect = ({ value, handleChange, options }) => {
  const iconComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  const classes = useStyles();

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const selectedIndex = options.findIndex((option) => option.name === value);

  return (
    <FormControl>
      <Select
        disableUnderline
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={selectedIndex}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiTSelect;
