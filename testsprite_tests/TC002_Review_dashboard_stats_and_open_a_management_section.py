import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:4200/login")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Iniciar sesión' button to submit the login form and navigate to the dashboard.
        # Iniciar sesión button
        elem = page.get_by_role('button', name='Iniciar sesión', exact=True)
        await elem.click(timeout=10000)
        
        # -> Hacer clic en el enlace rápido 'Estudiante' dentro de la sección 'Accesos rápidos' para abrir la gestión de estudiantes.
        # Estudiante link
        elem = page.get_by_role('link', name='Estudiante', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the management section opens
        # Assert: URL contains '/estudiantes', confirming the management section is open.
        await expect(page).to_have_url(re.compile("/estudiantes"), timeout=15000), "URL contains '/estudiantes', confirming the management section is open."
        # Assert: The 'Nuevo estudiante' button is visible in the management section.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-estudiantes/div[1]/a").nth(0)).to_have_text("Nuevo estudiante", timeout=15000), "The 'Nuevo estudiante' button is visible in the management section."
        # Assert: The students table header is visible, confirming the management list loaded.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-estudiantes/div[2]/div[2]/table/thead/tr").nth(0)).to_have_text("#\nNombre\nEdad\nTel\u00e9fono\nEmail\nAcciones", timeout=15000), "The students table header is visible, confirming the management list loaded."
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    