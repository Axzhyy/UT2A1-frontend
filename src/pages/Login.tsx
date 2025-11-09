import { Container, Stack, Typography, Button } from "@mui/material";

export default function Login() {
    return (
        <main>
            <Container sx={{ py: 6 }}>
                <Stack spacing={2}>
                    <Typography variant="h1">Página de Login</Typography>
                    <Typography variant="h2" color="primary">H2 con color primary</Typography>
                    <Typography variant="h3" color="secondary">H3 con color secondary</Typography>
                    <Typography variant="subtitle1">Subtítulo (subtitle1)</Typography>
                    <Typography variant="body1">Texto de ejemplo (body1).</Typography>
                    <Typography variant="caption">Caption</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="text" color="primary">Text primary</Button>
                        <Button variant="contained" color="secondary">Contained secondary</Button>
                        <Button variant="outlined" color="error">Outlined error</Button>
                    </Stack>
                </Stack>
            </Container>
        </main>
    );
}