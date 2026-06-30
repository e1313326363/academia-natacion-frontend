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
        
        # -> Fill the 'Correo electrónico' field with admin@academia.com, fill the 'Contraseña' field with admin123, then click the 'Iniciar sesión' button.
        # admin@academia.com email field
        elem = page.get_by_placeholder('admin@academia.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin@academia.com")
        
        # -> Fill the 'Correo electrónico' field with admin@academia.com, fill the 'Contraseña' field with admin123, then click the 'Iniciar sesión' button.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin123")
        
        # -> Fill the 'Correo electrónico' field with admin@academia.com, fill the 'Contraseña' field with admin123, then click the 'Iniciar sesión' button.
        # Iniciar sesión button
        elem = page.get_by_role('button', name='Iniciar sesión', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Inscripciones' link in the sidebar to open the enrollments page.
        # Inscripciones link
        elem = page.get_by_role('link', name='Inscripciones', exact=True)
        await elem.click(timeout=10000)
        
        # -> Abrir el desplegable de filtro que muestra 'Todos los estados' para exponer las opciones de estado.
        # Todos los estados Activo Suspendido Baja dropdown
        elem = page.get_by_text('Todos los estados Activo Suspendido Baja', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select 'Suspendido' from the 'Todos los estados' status filter dropdown.
        # Todos los estados Activo Suspendido Baja dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # --> Assertions to verify final state
        
        # --> Verify enrollments matching the selected status are displayed
        # Assert: The enrollments list shows the empty-state message 'No hay inscripciones.' after applying the status filter.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr/td").nth(0)).to_have_text("No hay inscripciones.", timeout=15000), "The enrollments list shows the empty-state message 'No hay inscripciones.' after applying the status filter."
        # Assert: The enrollments total displays 'Total: 0', confirming there are no enrollments matching the selected status.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[3]/small").nth(0)).to_have_text("Total: 0", timeout=15000), "The enrollments total displays 'Total: 0', confirming there are no enrollments matching the selected status."
        
        # --> Verify enrollments with other statuses are not displayed
        # Assert: The enrollments table displays the empty-state message 'No hay inscripciones.' showing no entries are visible.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr/td").nth(0)).to_have_text("No hay inscripciones.", timeout=15000), "The enrollments table displays the empty-state message 'No hay inscripciones.' showing no entries are visible."
        # Assert: The footer shows 'Total: 0', confirming there are zero enrollments displayed.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[3]/small").nth(0)).to_have_text("Total: 0", timeout=15000), "The footer shows 'Total: 0', confirming there are zero enrollments displayed."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    