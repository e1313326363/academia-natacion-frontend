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
        
        # -> Fill the 'Contraseña' field with admin123 and click the 'Iniciar sesión' button.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin123")
        
        # -> Fill the 'Contraseña' field with admin123 and click the 'Iniciar sesión' button.
        # Iniciar sesión button
        elem = page.get_by_role('button', name='Iniciar sesión', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Estudiantes' link in the sidebar to open the Students management page.
        # Estudiantes link
        elem = page.get_by_role('link', name='Estudiantes', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the '+ Nuevo estudiante' button to open the new student form.
        # Nuevo estudiante link
        elem = page.get_by_role('link', name='Nuevo estudiante', exact=True)
        await elem.click(timeout=10000)
        
        # -> Rellenar 'Nombre completo' con 'Student Enrollment Target', establecer 'Fecha de nacimiento' y hacer clic en el botón 'Guardar'.
        # text field
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-estudiante/div[2]/div/form/div/input')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Student Enrollment Target")
        
        # -> Rellenar 'Nombre completo' con 'Student Enrollment Target', establecer 'Fecha de nacimiento' y hacer clic en el botón 'Guardar'.
        # date field
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-estudiante/div[2]/div/form/div[2]/input')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2015-05-20")
        
        # -> Rellenar 'Nombre completo' con 'Student Enrollment Target', establecer 'Fecha de nacimiento' y hacer clic en el botón 'Guardar'.
        # correo@ejemplo.com email field
        elem = page.get_by_placeholder('correo@ejemplo.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("student.enrollment@example.com")
        
        # -> Rellenar 'Nombre completo' con 'Student Enrollment Target', establecer 'Fecha de nacimiento' y hacer clic en el botón 'Guardar'.
        # Guardar button
        elem = page.get_by_role('button', name='Guardar', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Inscripciones' link in the sidebar to open the Enrollments page.
        # Inscripciones link
        elem = page.get_by_role('link', name='Inscripciones', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the '+ Nueva inscripción' button to open the New Enrollment form.
        # Nueva inscripción link
        elem = page.get_by_role('link', name='Nueva inscripción', exact=True)
        await elem.click(timeout=10000)
        
        # -> Abrir el menú desplegable 'Estudiante' y seleccionar 'Student Enrollment Target' desde la lista.
        # Selecciona un estudiante… Estudiante Demo 01... dropdown
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-inscripcion/div[2]/div/form/div/select')
        await elem.click(timeout=10000)
        
        # -> Select 'Student Enrollment Target' from the 'Estudiante' dropdown on the 'Nueva Inscripción' form.
        # Selecciona un estudiante… Estudiante Demo 01... dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-form-inscripcion/div[2]/div/form/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Advanced Lane 1' from the 'Clase' dropdown on the 'Nueva Inscripción' form.
        # Selecciona una clase… Advanced Lane 1 Advanced... dropdown
        elem = page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-form-inscripcion/div[2]/div/form/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill 'Fecha de inscripción' with '2026-06-30' and click the 'Guardar' button to save the enrollment.
        # date field
        elem = page.locator('xpath=/html/body/app-root/app-layout/div/div/div/app-form-inscripcion/div[2]/div/form/div[3]/input')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2026-06-30")
        
        # -> Fill 'Fecha de inscripción' with '2026-06-30' and click the 'Guardar' button to save the enrollment.
        # Guardar button
        elem = page.get_by_role('button', name='Guardar', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the enrollment list is displayed
        # Assert: The enrollments table header with columns is visible.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/thead/tr").nth(0)).to_have_text("#\nEstudiante\nClase\nFecha\nEstado\nAcciones", timeout=15000), "The enrollments table header with columns is visible."
        # Assert: The enrollments list footer shows the total count.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[3]/small").nth(0)).to_have_text("Total: 4", timeout=15000), "The enrollments list footer shows the total count."
        
        # --> Verify the new enrollment appears in the list
        # Assert: The enrollment list contains the student 'Student Enrollment Target'.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[1]/td[2]").nth(0)).to_have_text("Student Enrollment Target", timeout=15000), "The enrollment list contains the student 'Student Enrollment Target'."
        # Assert: The enrollment list shows the class 'Advanced Lane 1' for the new enrollment.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[1]/td[3]").nth(0)).to_have_text("Advanced Lane 1", timeout=15000), "The enrollment list shows the class 'Advanced Lane 1' for the new enrollment."
        # Assert: The enrollment list shows the enrollment date 30/06/2026.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[1]/td[4]").nth(0)).to_have_text("30/06/2026", timeout=15000), "The enrollment list shows the enrollment date 30/06/2026."
        # Assert: The enrollment list shows the enrollment status 'Activo'.
        await expect(page.locator("xpath=/html/body/app-root/app-layout/div/div/div/app-lista-inscripciones/div[2]/div[2]/table/tbody/tr[1]/td[5]").nth(0)).to_have_text("Activo", timeout=15000), "The enrollment list shows the enrollment status 'Activo'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    