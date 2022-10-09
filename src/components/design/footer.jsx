import "../../styles/components/design/footer.css";
import { createStyles, Anchor, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
// import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function FooterCentered() {
  const links = [
    { label: "Rental Properties", link: "/rental" },
    { label: "Blog", link: "https://blog.rentmine.in" },
    { label: "About Us", link: "/about" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Terms & Conditions", link: "/terms" },
    { label: "Contact Us", link: "/contact" },
  ];
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      color="dimmed"
      href={link.link}
      sx={{ lineHeight: 1 }}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <img
          src="https://languate.vercel.app/assets/logo.png"
          alt="Rentmine Logo"
          className="footer-logo"
        />
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
