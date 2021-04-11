import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  siteId: {
    marginRight: "auto",
  },
  navItems: {
    // margin: theme.spacing(2),
    color: theme.palette.primary.light,
  },
  toolbar: {
    // maxWidth: "1200px",
  },

  title: {
    flexGrow: 1,
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
}));
const Navigation = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar color="inherit">
        {/* <Container maxWidth="lg"> */}
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Reverse IPA
          </Typography>
          <Button className={classes.navItems}>
            <Typography className={classes.navItems}>Login</Typography>
          </Button>

          <Button className={classes.navItems}>
            <Typography className={classes.navItems}>Sign Up</Typography>
          </Button>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Navigation;
