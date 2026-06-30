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
        
        # -> Fill the email and password fields with the admin credentials and click the 'Iniciar sesión' button.
        # admin@academia.com email field
        elem = page.get_by_placeholder('admin@academia.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin@academia.com")
        
        # -> Fill the email and password fields with the admin credentials and click the 'Iniciar sesión' button.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin123")
        
        # -> Fill the email and password fields with the admin credentials and click the 'Iniciar sesión' button.
        # Iniciar sesión button
        elem = page.get_by_role('button', name='Iniciar sesión', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Inscripciones' link in the sidebar to open the enrollment list page.
        # Inscripciones link
        elem = page.get_by_role('link', name='Inscripciones', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the 'Activo' dropdown in Juan Perez's row (the status dropdown in the row showing 'Juan Perez').
        # Activo Suspendido Baja dropdown
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[2]/td[6]/select')
        await elem.click(timeout=10000)
        
        # -> Seleccionar la opción 'Suspendido' en el dropdown de estado de la fila de Juan Perez para cambiar su estado.
        # Activo Suspendido Baja dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[2]/td[6]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # --> Assertions to verify final state
        
        # --> Verify the updated enrollment status is displayed
        # Assert: Juan Perez's enrollment row shows the status 'Suspendido'.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[2]/td[5]").nth(0)).to_have_text("Suspendido", timeout=15000), "Juan Perez's enrollment row shows the status 'Suspendido'."
        
        # --> Verify the enrollment remains in the list
        # Assert: The enrollment row for 'Juan Perez' is present in the list.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[2]/td[2]").nth(0)).to_have_text("Juan Perez", timeout=15000), "The enrollment row for 'Juan Perez' is present in the list."
        # Assert: The total count shows 'Total: 3', indicating the enrollment was not removed from the list.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[3]/small").nth(0)).to_have_text("Total: 3", timeout=15000), "The total count shows 'Total: 3', indicating the enrollment was not removed from the list."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    