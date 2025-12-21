import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HitCount extends HttpServlet {

    public void service(HttpServletRequest req,
                        HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        // get or create session
        HttpSession session = req.getSession();

        // retrieve previous hit count
        Integer hitNumber = (Integer) session.getAttribute("rama");

        if (hitNumber == null) {
            hitNumber = new Integer(1);
        } else {
            hitNumber = new Integer(hitNumber.intValue() + 1);
        }

        // store updated count
        session.setAttribute("rama", hitNumber);

        out.println("<html><body>");
        out.println("Your Session ID: " + session.getId());
        out.println("<br>Session Creation Time: "
                + new Date(session.getCreationTime()));
        out.println("<br>Time of Last Access: "
                + new Date(session.getLastAccessedTime()));
        out.println("<br>Latest Hit Count: " + hitNumber);
        out.println("</body></html>");

        out.close();
    }
}
