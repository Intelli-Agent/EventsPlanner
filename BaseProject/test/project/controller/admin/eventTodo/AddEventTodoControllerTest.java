package project.controller.admin.eventTodo;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.slim3.tester.ControllerTestCase;

public class AddEventTodoControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception{
        tester.start("admin/eventTodo/addEventTodo");
        AddEventTodoController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is(nullValue()));
    }
    
}
