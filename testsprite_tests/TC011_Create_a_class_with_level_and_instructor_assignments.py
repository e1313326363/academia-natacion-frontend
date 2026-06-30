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
        
        # -> Fill the email and password fields and click the 'Iniciar sesión' button to log in as admin.
        # admin@academia.com email field
        elem = page.get_by_placeholder('admin@academia.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin@academia.com")
        
        # -> Fill the email and password fields and click the 'Iniciar sesión' button to log in as admin.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin123")
        
        # -> Fill the email and password fields and click the 'Iniciar sesión' button to log in as admin.
        # Iniciar sesión button
        elem = page.get_by_role('button', name='Iniciar sesión', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Clases' link in the sidebar to open the classes page.
        # Clases link
        elem = page.get_by_role('link', name='Clases', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Nueva clase' button to open the New Class form.
        # Nueva clase link
        elem = page.get_by_role('link', name='Nueva clase', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill 'Advanced Lane 1' into the 'Nombre de la clase' field and open the 'Nivel' dropdown.
        # text field
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-clase/div[2]/div/form/div/input')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Advanced Lane 1")
        
        # -> Fill 'Advanced Lane 1' into the 'Nombre de la clase' field and open the 'Nivel' dropdown.
        # Selecciona un nivel… Avanzado Competencia... dropdown
        elem = page.get_by_text('Selecciona un nivel… Avanzado Competencia Intermedio Principiante', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select 'Avanzado' from the 'Nivel' dropdown
        # Selecciona un nivel… Avanzado Competencia... dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-form-clase/div[2]/div/form/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Carlos Rodriguez' from the 'Instructor' dropdown, set 'Cupo máximo' to 12, then click the 'Guardar' button.
        # Selecciona un instructor… Carlos Rodriguez dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-form-clase/div[2]/div/form/div[3]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Carlos Rodriguez' from the 'Instructor' dropdown, set 'Cupo máximo' to 12, then click the 'Guardar' button.
        # number field
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-clase/div[2]/div/form/div[4]/input')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("12")
        
        # -> Select 'Carlos Rodriguez' from the 'Instructor' dropdown, set 'Cupo máximo' to 12, then click the 'Guardar' button.
        # Guardar button
        elem = page.get_by_role('button', name='Guardar', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the class list is displayed
        await page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-clases/div[2]/div[1]/table/thead/tr").nth(0).scroll_into_view_if_needed()
        # Assert: The class list table header is visible.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-clases/div[2]/div[1]/table/thead/tr").nth(0)).to_be_visible(timeout=15000), "The class list table header is visible."
        
        # --> Verify the new class appears in the list
        # Assert: New class 'Advanced Lane 1' is present in the classes list.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-clases/div[2]/div[1]/table/tbody/tr[1]/td[2]").nth(0)).to_have_text("Advanced Lane 1", timeout=15000), "New class 'Advanced Lane 1' is present in the classes list."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    